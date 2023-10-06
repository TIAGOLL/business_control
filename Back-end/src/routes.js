import { Router } from "express";

import productController from "./controllers/productController";
import categorieController from "./controllers/categorieController";
import requestsController from "./controllers/requestsController";

const router = Router();

//products
router.get("/products", productController.findAllProducts);
router.get("/products/:id", productController.findProductById);
router.post("/products", productController.createProduct)
router.put("/products/:id", productController.updateProduct)
router.delete("/products/:id", productController.deleteProduct);

//requests
router.get("/requests", requestsController.findAllRequests)
router.put("/requests/:id", requestsController.updateRequest)
router.post("/requests", requestsController.createRequest)
router.delete("/requests/:id", requestsController.deleteRequest);

//categorys
router.get("/categorys", categorieController.findAllCategorys);

export { router };