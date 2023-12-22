import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async post(req, res) {
    const {
      accounts_id,
      status_tracking_id,
      store_name,
      tracking_id,
      prod_requests,
    } = req.body.data;

    console.log(req.body.data);
    try {
      await prisma.requests
        .create({
          data: {
            store_name: store_name,
            tracking_id: tracking_id,
            accounts: {
              connect: {
                id: parseInt(accounts_id),
              },
            },
            status_tracking: {
              connect: {
                id: parseInt(status_tracking_id),
              },
            },
            prod_requests: {
              create: prod_requests.map((prod) => {
                return {
                  products_id: parseInt(prod.products_id),
                  quantity: parseInt(prod.quantity),
                  purchase_price: parseFloat(prod.purchase_price),
                  color: prod.color,
                };
              }),
            },
          },
        })
        .catch((error) => {
          console.log(error);
          return res.json({ message: error.message });
        })
        .then((item) => {
          return res.json({
            data: item,
            message: "Pedido cadastrado com sucesso",
          });
        });
    } catch (error) {
      return console.log(error.message);
    }
  },
};
