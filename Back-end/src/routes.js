const Router = require("express");

import requestsGET from "./controllers/pages/requestController/get";
import requestsDEL from "./controllers/pages/requestController/delete";
import requestsPOST from "./controllers/pages/requestController/post";

const router = Router();

//products

//requests
router.get("/api/requests/all", requestsGET.loadAll);
router.get("/api/requests/actives", requestsGET.loadActives);
router.get("/api/requests/waitingforrefund", requestsGET.loadWaitingForRefund);
router.get("/api/requests/refunded", requestsGET.loadRefunded);
router.get("/api/requests/intransit", requestsGET.loadInTransit);
router.get("/api/requests/byid/:id", requestsGET.loadById);
router.get("/api/requests/canceled", requestsGET.loadCanceled);
router.delete("/api/requests/delete/:id", requestsDEL.delete);
router.post("/api/requests/post", requestsPOST.post);

//categorys

//platforms

//accounts

//status tracking

export { router };
