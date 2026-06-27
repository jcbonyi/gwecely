import express, { type NextFunction, type Request, type Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clerkMiddleware } from "@clerk/express";
import { productsRouter } from "./routes/products.js";
import { adminProductsRouter } from "./routes/admin.js";
import { automationRouter } from "./routes/automation.js";
import { getDb } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function corsOrigins(): string[] {
  const fromEnv = [
    process.env.CLIENT_URL,
    ...(process.env.CORS_ORIGINS ?? "").split(","),
  ]
    .map((o) => o?.trim())
    .filter(Boolean) as string[];
  return fromEnv;
}

function isAllowedOrigin(origin: string): boolean {
  const allowed = corsOrigins();
  if (allowed.includes(origin)) return true;
  if (process.env.ALLOW_VERCEL_PREVIEW !== "false") {
    try {
      const { hostname } = new URL(origin);
      if (hostname.endsWith(".vercel.app")) return true;
    } catch {
      /* ignore */
    }
  }
  return false;
}

function corsMiddleware(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  if (typeof origin === "string" && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Automation-Key");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
}

function generateRef(prefix = "GWC") {
  return `${prefix}-${Date.now().toString().slice(-6)}`;
}

export interface CreateAppOptions {
  serveStatic?: boolean;
}

export function createApp(options: CreateAppOptions = {}) {
  const { serveStatic = false } = options;
  const app = express();

  app.use(corsMiddleware);

  // Initialise DB on startup
  getDb();

  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true, limit: "2mb" }));

  if (process.env.CLERK_SECRET_KEY) {
    app.use(clerkMiddleware());
  } else {
    console.warn("[auth] CLERK_SECRET_KEY not set — admin routes will reject requests");
  }

  app.post("/api/booking", (req, res) => {
    const { name, phone, service } = req.body ?? {};
    if (!name || !phone || !service) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }
    const ref = generateRef();
    console.log("[booking]", ref, req.body);
    return res.json({ ok: true, ref });
  });

  app.post("/api/contact", (req, res) => {
    const { name, message } = req.body ?? {};
    if (!name || !message) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }
    console.log("[contact]", req.body);
    return res.json({ ok: true });
  });

  app.post("/api/mpesa/stk-push", (req, res) => {
    const { phone, amount } = req.body ?? {};
    const configured =
      process.env.MPESA_CONSUMER_KEY &&
      process.env.MPESA_CONSUMER_SECRET &&
      process.env.MPESA_PASSKEY &&
      process.env.MPESA_SHORTCODE;

    if (!configured) {
      return res.status(503).json({
        ok: false,
        error: "M-Pesa not configured",
      });
    }
    if (!phone || !amount) {
      return res.status(400).json({ ok: false, error: "Phone and amount required" });
    }
    return res.status(501).json({ ok: false, error: "M-Pesa integration pending" });
  });

  app.use("/api/products", productsRouter);
  app.use("/api/admin", adminProductsRouter);
  app.use("/api/automation", automationRouter);

  if (serveStatic) {
    const staticPath =
      process.env.NODE_ENV === "production"
        ? path.resolve(__dirname, "public")
        : path.resolve(__dirname, "..", "dist", "public");

    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  return app;
}
