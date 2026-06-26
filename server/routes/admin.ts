import { Router } from "express";
import multer from "multer";
import { getAuth } from "@clerk/express";
import type { ProductInput } from "../../shared/product.js";
import { adminAuth } from "../middleware/adminAuth.js";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../db.js";
import { configureCloudinary, isCloudinaryConfigured, uploadBuffer } from "../cloudinary.js";

configureCloudinary();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const adminProductsRouter = Router();

adminProductsRouter.use(...adminAuth);

adminProductsRouter.get("/products", (_req, res) => {
  res.json(listProducts());
});

adminProductsRouter.get("/products/:id", (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

adminProductsRouter.post("/products", (req, res) => {
  const auth = getAuth(req);
  const email = (auth.sessionClaims?.email as string) ?? "admin";
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
  const auth = getAuth(req);
  const email = (auth.sessionClaims?.email as string) ?? "admin";
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
