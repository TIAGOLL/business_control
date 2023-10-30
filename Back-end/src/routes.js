import { Router } from "express";

import productController from "./controllers/productController";
import categoryController from "./controllers/categoryController";
import requestsController from "./controllers/requestsController";
import platformController from "./controllers/platformController";
import accountController from "./controllers/accountController";
import statusTrakingController from "./controllers/statusTrakingController";
import prodRequestController from "./controllers/prodRequestController";

const router = Router();

//products
router.get("/products", productController.findAllProducts);
router.get("/products/:id", productController.findProductById);
router.post("/products", productController.createProduct)
router.put("/products/:id", productController.updateProduct)
router.delete("/products/:id", productController.deleteProduct);

//requests
router.get("/requests", requestsController.findAllRequests)
router.get("/requests/:id", requestsController.findRequestsById)
router.put("/requests/:id", requestsController.updateRequest)
router.post("/requests", requestsController.createRequest)
router.delete("/requests/:id", requestsController.deleteRequest);
router.get("/requests/products/:id", requestsController.findAllRequestsByProductId)

//categorys
router.get("/categorys", categoryController.findAllCategorys);
router.get("/categorys/:id", categoryController.findCategorysById);

//platforms
router.get("/platforms", platformController.findAllPlatforms);

//accounts
router.get("/accounts", accountController.findAllAccounts);

//status tracking
router.get("/statustracking", statusTrakingController.findAllStatusTracking);

//prod requests
router.get("/prodrequests/:id", prodRequestController.findAllProdRequests)
router.get("/prodrequests/delivered/:id", prodRequestController.findProdrequestsIfdelivered)

export { router };