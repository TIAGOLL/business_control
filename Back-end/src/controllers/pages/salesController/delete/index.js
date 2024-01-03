import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async delete(req, res) {
    const { id } = req.params;

    const sale = await prisma.purchases.update({
      where: {
        id: parseInt(id),
      },
      data: {
        active: false,
        prod_purchases: {
          updateMany: {
            data: {
              active: false,
            },
          },
        },
      },
    });

    return res.json({
      sale: sale,
      message: "Venda deletada com sucesso",
    });
  },
};
