import { Router } from "express";
import multer from "multer";
import { createClerkClient } from "@clerk/backend";
import { v2 as cloudinary } from "cloudinary";
import type { ProductInput } from "../../shared/product.js";
import type { AdminRole } from "../../shared/admin.js";
import { parseGoogleSheetUrl, sheetCsvExportUrl } from "../../shared/sheet-csv.js";
import { adminAuth, requireOwner } from "../middleware/adminAuth.js";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../db.js";
import { configureCloudinary, isCloudinaryConfigured, uploadBuffer } from "../cloudinary.js";
import { importProductsFromSheetCsv } from "../sheet-import.js";
import {
  addAdminUser,
  listAdminUsers,
  removeAdminUser,
} from "../turso-admin-users.js";
import { tursoEnabled } from "../turso-db.js";

configureCloudinary();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const adminProductsRouter = Router();

adminProductsRouter.use(...adminAuth);

adminProductsRouter.get("/me", (req, res) => {
  res.json({ email: res.locals.adminEmail, role: res.locals.adminRole });
});

adminProductsRouter.post("/import-sheet", async (req, res) => {
  if (!tursoEnabled()) {
    return res.status(503).json({ error: "Sheet import requires Turso (TURSO_DATABASE_URL + TURSO_AUTH_TOKEN)." });
  }

  const sheetUrl = typeof req.body?.sheetUrl === "string" ? req.body.sheetUrl.trim() : "";
  const gid = typeof req.body?.gid === "string" ? req.body.gid.trim() : undefined;
  if (!sheetUrl) return res.status(400).json({ error: "sheetUrl is required" });

  const parsed = parseGoogleSheetUrl(sheetUrl);
  if (!parsed) return res.status(400).json({ error: "Invalid Google Sheet URL" });

  try {
    const exportUrl = sheetCsvExportUrl(parsed.spreadsheetId, gid || parsed.gid);
    const response = await fetch(exportUrl, { redirect: "follow" });
    const csvText = await response.text();
    if (!response.ok || csvText.trim().startsWith("<!DOCTYPE") || csvText.includes("<html")) {
      return res.status(400).json({
        error: 'Could not read the sheet. Share it as "Anyone with the link can view".',
      });
    }

    const result = await importProductsFromSheetCsv(csvText, res.locals.adminEmail ?? "admin");
    res.json(result);
  } catch (e) {
    console.error("[import-sheet]", e);
    res.status(500).json({ error: "Import failed" });
  }
});

adminProductsRouter.get("/users", requireOwner, async (_req, res) => {
  try {
    res.json(await listAdminUsers());
  } catch (e) {
    console.error("[users]", e);
    res.status(500).json({ error: "Failed to load users" });
  }
});

adminProductsRouter.post("/users", requireOwner, async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const role = (req.body?.role ?? "editor") as AdminRole;
  if (!email || !email.includes("@")) return res.status(400).json({ error: "A valid email is required" });
  if (role !== "editor" && role !== "owner") return res.status(400).json({ error: "role must be editor or owner" });

  try {
    const user = await addAdminUser(email, role, res.locals.adminEmail ?? "admin");
    const clientUrl = (process.env.CLIENT_URL ?? "https://gwecely.vercel.app").replace(/\/$/, "");
    const secret = process.env.CLERK_SECRET_KEY;
    if (secret) {
      await createClerkClient({ secretKey: secret }).invitations.createInvitation({
        emailAddress: email,
        redirectUrl: `${clientUrl}/admin/products`,
      });
    }
    res.status(201).json({ user, invited: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invite failed";
    res.status(400).json({ error: message });
  }
});

adminProductsRouter.delete("/users", requireOwner, async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  if (!email) return res.status(400).json({ error: "email is required" });
  try {
    const ok = await removeAdminUser(email);
    if (!ok) return res.status(404).json({ error: "User not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e instanceof Error ? e.message : "Remove failed" });
  }
});

adminProductsRouter.get("/products", (_req, res) => {
  res.json(listProducts());
});

adminProductsRouter.get("/products/:id", (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

adminProductsRouter.post("/products", (req, res) => {
  const email = res.locals.adminEmail ?? "admin";
  const body = req.body as ProductInput;

  if (!body.name?.trim() || !body.category || body.price == null || !body.image || !body.description?.trim()) {
    return res.status(400).json({ error: "name, category, price, image, and description are required" });
  }

  const product = createProduct(
    {
      ...body,
      price: Number(body.price),
      originalPrice: body.originalPrice != null ? Number(body.originalPrice) : null,
      rating: body.rating != null ? Number(body.rating) : 4.5,
      reviews: body.reviews != null ? Number(body.reviews) : 0,
    },
    email
  );
  res.status(201).json(product);
});

adminProductsRouter.put("/products/:id", (req, res) => {
  const email = res.locals.adminEmail ?? "admin";
  const body = req.body as Partial<ProductInput>;

  const product = updateProduct(
    req.params.id,
    {
      ...body,
      price: body.price != null ? Number(body.price) : undefined,
      originalPrice:
        body.originalPrice !== undefined
          ? body.originalPrice == null
            ? null
            : Number(body.originalPrice)
          : undefined,
      rating: body.rating != null ? Number(body.rating) : undefined,
      reviews: body.reviews != null ? Number(body.reviews) : undefined,
    },
    email
  );

  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

adminProductsRouter.delete("/products/:id", (req, res) => {
  const ok = deleteProduct(req.params.id);
  if (!ok) return res.status(404).json({ error: "Product not found" });
  res.json({ ok: true });
});

adminProductsRouter.get("/upload-signature", (_req, res) => {
  if (!isCloudinaryConfigured()) {
    return res.status(503).json({
      error: "Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.",
    });
  }

  const folder = "gwecely/products";
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  );

  res.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  });
});

adminProductsRouter.post("/upload", upload.single("image"), async (req, res) => {
  if (!isCloudinaryConfigured()) {
    return res.status(503).json({
      error: "Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.",
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  try {
    const url = await uploadBuffer(req.file.buffer);
    res.json({ url });
  } catch (e) {
    console.error("[upload]", e);
    res.status(500).json({ error: "Image upload failed" });
  }
});
