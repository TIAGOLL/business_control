import { Router } from "express";

import productController from "./controllers/productController";

const router = Router();

router.get("/products", productController.findAllProducts);
router.post("/products", productController.createProduct)
router.put("/products/:id", productController.updateProduct)
router.delete("/user/:id", productController.deleteProduct);
router.get("/products/:id", productController.findProductById);

export { router };