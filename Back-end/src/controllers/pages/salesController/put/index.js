import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async markAsPaid(req, res) {
    const { id } = req.params;

    const sale = await prisma.purchases
      .update({
        where: {
          id: parseInt(id),
        },
        data: {
          paid: true,
        },
      })
      .catch((error) => {
        return res.status(500).json({
          error: error,
          message: "Erro ao marcar como pago",
        });
      });

    return res.status(200).json({
      sale: sale,
      message: "Venda marcada como paga!",
    });
  },
};
