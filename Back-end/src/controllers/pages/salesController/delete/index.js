import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async delete(req, res) {
    const { id } = req.params;
    const { prod_purchases, client_id, total_sold, coupom_discount } = req.body;
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
              where: {
                purchase_id: parseInt(id),
              },
            },
          },
        },
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Erro ao deletar venda" });
      });

    //atualiza o estoque dos produtos
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

    const totalPurchase =
      parseFloat(total_sold) -
      parseFloat(total_sold) * parseFloat(coupom_discount);

    //atualiza o total comprado pelo cliente
    await prisma.clients
      .update({
        where: {
          id: parseInt(client_id),
        },
        data: {
          total_purchased: {
            decrement: totalPurchase,
          },
        },
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Erro ao atualizar total comprado pelo cliente" });
      });

    return res.status(200).json({
      sale: sale,
      message: "Venda deletada com sucesso",
    });
  },
};
