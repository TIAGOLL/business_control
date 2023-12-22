const Router = require("express");

import requestsGET from "./controllers/pages/requestsController/get";
import requestsDEL from "./controllers/pages/requestsController/delete";
import requestsPOST from "./controllers/pages/requestsController/post";

import productsGET from "./controllers/pages/productsController/get";
import productsPUT from "./controllers/pages/productsController/put";
import productsDEL from "./controllers/pages/productsController/delete";
import productsPOST from "./controllers/pages/productsController/post";


const router = Router();

//products
router.get("/api/products/actives", productsGET.loadActives);
router.get("/api/products/deleted", productsGET.loadDeleted);
router.get("/api/products/byid/:id", productsGET.loadById);
router.get("/api/products/avaibles", productsGET.loadAvailables);
router.get("/api/products/intransit", productsGET.loadInTransit);

//requests
router.get("/api/requests/all", requestsGET.loadAll);
router.get("/api/requests/actives", requestsGET.loadActives);
router.get("/api/requests/waitingforrefund", requestsGET.loadWaitingForRefund);
router.get("/api/requests/refunded", requestsGET.loadRefunded);
router.get("/api/requests/intransit", requestsGET.loadInTransit);
router.get("/api/requests/byid/:id", requestsGET.loadById);
router.get("/api/requests/canceled", requestsGET.loadCanceled);
router.get("/api/requests/ofcreate", requestsGET.loadOfCreateRequest);
router.delete("/api/requests/delete/:id", requestsDEL.delete);
router.post("/api/requests/post", requestsPOST.post);

//categorys

//platforms

//accounts

//status tracking

export { router };
