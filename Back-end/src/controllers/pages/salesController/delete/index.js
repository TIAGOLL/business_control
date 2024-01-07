import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async delete(req, res) {
    const { id } = req.params;

    const sale = await prisma.purchases
      .update({
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
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Erro ao deletar venda" });
      });

    prod_purchases.map(async (prod) => {
      await prisma.products
        .update({
          where: {
            id: prod.products_id,
          },
          data: {
            quantity: {
              increment: prod.quantity,
            },
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao atualizar estoque" });
        });
    });

    return res.status(200).json({
      sale: sale,
      message: "Venda deletada com sucesso",
    });
  },
};
