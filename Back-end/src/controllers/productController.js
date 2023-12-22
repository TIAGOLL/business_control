import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {










  async findStockByProduct(req, res) {
    const { id } = req.params;
    try {
      const prodRequests = await prisma.request.findMany({
        include: {
          prod_request: true,
          status_tracking: true
        },
        where: {
          prod_request: {
            some: {
              product_id: parseInt(id),
            }
          },
          status_tracking: {
            name: 'Entregue'
          }
        },
      })
        .then((request) => {
          return request
        })
        .catch((error) => {
          console.log(error.message);
          return error.message;
        });
      let totalQuantity = 0
      prodRequests.map((reqs) => {
        reqs.prod_request.map((prod) => {
          if (prod.product_id == id) return totalQuantity = prod.quantity + totalQuantity;
        })
      })
      return res.json(totalQuantity);
    } catch (error) {
      return error.message;
    }
  },

  async findCurrentPurchasePriceByProduct(req, res) {
    const { id } = req.params;
    try {
      const prodRequests = await prisma.request.findMany({
        include: {
          prod_request: true,
        },
        where: {
          prod_request: {
            some: {
              product_id: parseInt(id),
            }
          },
        },
      })
        .then((request) => {
          return request
        })
        .catch((error) => {
          console.log(error.message);
          return error.message;
        });
      if (prodRequests.length == 0) return res.json('Nenhum preço de compra encontrado'); // se não houver nenhuma request com o produto, retorna 0
      let currentPurchasePrice = 0;
      let currentRequest = 0;
      // pega a ultima request que contem o produto
      prodRequests.map((reqs) => {
        if (reqs.id > currentRequest) currentRequest = reqs.id;
      })
      // pega o preço de compra do produto na ultima request
      prodRequests.map((reqs) => {
        if (reqs.id == currentRequest) {
          reqs.prod_request.map((prod) => {
            if (prod.product_id == id) return currentPurchasePrice = prod.purchase_price;
          })
        }
      })
      return res.json(currentPurchasePrice);
    } catch (error) {
      return error.message;
    }
  },

  async totalInvested(req, res) {
    try {
      const prodRequests = await prisma.request.findMany({
        include: {
          prod_request: true,
          status_tracking: true
        },
      })
        .then((request) => {
          return request
        })
        .catch((error) => {
          console.log(error.message);
          return error.message;
        });
      let totalInvested = 0;
      prodRequests.map((reqs) => {
        reqs.prod_request.map((prod) => {
          totalInvested = prod.purchase_price * prod.quantity + totalInvested;
        })
      })
      return res.json(totalInvested.toFixed(2));
    } catch (error) {
      return error.message;
    }
  },

}
