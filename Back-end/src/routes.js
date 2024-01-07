const Router = require("express");

import requestsGET from "./controllers/pages/requestsController/get";
import requestsDEL from "./controllers/pages/requestsController/delete";
import requestsPOST from "./controllers/pages/requestsController/post";
import requestsPUT from "./controllers/pages/requestsController/put";

import productsGET from "./controllers/pages/productsController/get";
import productsPUT from "./controllers/pages/productsController/put";
import productsDEL from "./controllers/pages/productsController/delete";
import productsPOST from "./controllers/pages/productsController/post";

import salesGET from "./controllers/pages/salesController/get";
import salesPUT from "./controllers/pages/salesController/put";
import salesDEL from "./controllers/pages/salesController/delete";
import salesPOST from "./controllers/pages/salesController/post";

const router = Router();

//products
router.get("/api/products/load/actives", productsGET.loadActives);
router.get("/api/products/load/deleted", productsGET.loadDeleted);
router.get("/api/products/load/byid/:id", productsGET.loadById);
router.get("/api/products/load/avaibles", productsGET.loadAvailables);
router.get("/api/products/load/intransit", productsGET.loadInTransit);
router.get("/api/products/load/ofcreate", productsGET.loadOfCreate);
router.post("/api/products/post", productsPOST.post);
router.put("/api/products/put/:id", productsPUT.update);
router.delete("/api/products/delete/:id", productsDEL.delete);

//requests
router.get("/api/requests/load/all", requestsGET.loadAll);
router.get("/api/requests/load/actives", requestsGET.loadActives);
router.get(
  "/api/requests/load/waitingforrefund",
  requestsGET.loadWaitingForRefund
);
router.get("/api/requests/load/refunded", requestsGET.loadRefunded);
router.get("/api/requests/load/intransit", requestsGET.loadInTransit);
router.get("/api/requests/load/byid/:id", requestsGET.loadById);
router.get("/api/requests/load/canceled", requestsGET.loadCanceled);
router.get("/api/requests/load/ofcreate", requestsGET.loadOfCreate);
router.delete("/api/requests/delete/:id", requestsDEL.delete);
router.post("/api/requests/post", requestsPOST.post);
router.put("/api/requests/put/delivered/:id", requestsPUT.putForDelivered);
router.put(
  "/api/requests/put/waitingforrefund/:id",
  requestsPUT.putForWaitingForRefund
);
router.put("/api/requests/put/refunded/:id", requestsPUT.putForRefunded);

//sales
router.get("/api/sales/load/actives", salesGET.loadActives);
router.get("/api/sales/load/notpaid", salesGET.loadNotPaid);
router.get("/api/sales/load/ofcreate", salesGET.loadOfCreate);
router.get("/api/sales/load/byid/:id", salesGET.loadById);
router.post("/api/sales/post", salesPOST.post);
router.put("/api/sales/put/markaspaid/:id", salesPUT.markAsPaid);
router.delete("/api/sales/delete/:id", salesDEL.delete);

export { router };
