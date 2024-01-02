import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async putForDelivered(req, res) {
    const { prod_requests } = req.body.data || req.body;
    const { id } = req.params;

    await prisma.requests
      .update({
        where: {
          id: parseInt(id),
        },
        data: {
          status_tracking_id: 2,
        },
      })
      .catch((error) => {
        console.log(error);
        return res.json({ message: error.message });
      });

    prod_requests.map(async (prod) => {
      await prisma.products
        .update({
          where: {
            id: parseInt(prod.products_id),
          },
          data: {
            quantity: {
              increment: parseInt(prod.quantity),
            },
          },
        })
        .catch((error) => {
          console.log(error);
          return res.json({ message: error.message });
        });
    });
    return res.json({
      message: "Pedido atualizado com sucesso",
    });
  },

  async putForWaitingForRefund(req, res) {
    const { prod_requests } = req.body.data || req.body;
    const { id } = req.params;

    await prisma.requests.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status_tracking_id: 3,
      },
    });

    prod_requests.map(async (prod) => {
      await prisma.products
        .update({
          where: {
            id: parseInt(prod.products_id),
          },
          data: {
            quantity: {
              decrement: parseInt(prod.quantity),
            },
          },
        })
        .catch((error) => {
          console.log(error);
          return res.json({ message: error.message });
        });
    });

    return res.json({
      message: "Pedido atualizado com sucesso",
    });
  },

  async putForRefunded(req, res) {
    const { id } = req.params;

    await prisma.requests.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status_tracking_id: 4,
      },
    });

    return res.json({
      message: "Pedido atualizado com sucesso",
    });
  },
};
