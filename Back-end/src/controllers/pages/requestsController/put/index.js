import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async putForDelivered(req, res) {
    const { prod_requests } = req.body.data || req.body;
    const { id } = req.params;

    const request = await prisma.requests
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
        return res.status(500).json({ message: "Erro ao atualizar pedido" });
      });

    //atualiza o estoque dos produtos
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
          return res.status(500).json({ message: "Erro ao atualizar pedido" });
        });
    });
    return res.status(200).json({
      message: "Pedido atualizado com sucesso",
      request: request,
    });
  },

  async putForWaitingForRefund(req, res) {
    const { prod_requests } = req.body.data || req.body;
    const { id } = req.params;

    const request = await prisma.requests
      .update({
        where: {
          id: parseInt(id),
        },
        data: {
          status_tracking_id: 3,
        },
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Erro ao atualizar pedido" });
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
          return res.status(500).json({ message: "Erro ao atualizar pedido" });
        });
    });

    return res.status(200).json({
      message: "Pedido atualizado com sucesso",
      request: request,
    });
  },

  async putForRefunded(req, res) {
    const { id } = req.params;

    const request = await prisma.requests
      .update({
        where: {
          id: parseInt(id),
        },
        data: {
          status_tracking_id: 4,
        },
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Erro ao atualizar pedido" });
      });

    return res.status(200).json({
      message: "Pedido atualizado com sucesso",
      request: request,
    });
  },
};
