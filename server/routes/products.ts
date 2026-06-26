import { Router } from "express";
import { listProducts, getProductById } from "../db.js";

export const productsRouter = Router();

productsRouter.get("/", (_req, res) => {
  res.json(listProducts());
});

productsRouter.get("/:id", (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});
