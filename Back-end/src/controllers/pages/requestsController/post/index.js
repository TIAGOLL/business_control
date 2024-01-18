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
      created_at,
    } = req.body.data;

    try {
      // cria o pedido
      const request = await prisma.requests
        .create({
          data: {
            store_name: store_name,
            tracking_id: tracking_id,
            created_at: new Date(created_at),
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
                };
              }),
            },
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao cadastrar pedido" });
        });

      //atualiza o estoque e o preço de compra dos produtos
      prod_requests.map(async (prod) => {
        await prisma.products
          .update({
            where: {
              id: parseInt(prod.products_id),
            },
            data: {
              purchase_price: parseFloat(prod.purchase_price),
            },
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(500)
              .json({ message: "Erro ao atualizar preço do produto" });
          });
      });

      return res
        .status(201)
        .json({ message: "Pedido cadastrado com sucesso", request: request });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao cadastrar pedido" });
    }
  },
};
