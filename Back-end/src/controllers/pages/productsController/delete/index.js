import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async delete(req, res) {
    const { id } = req.params;

    try {
      await prisma.products
        .updateMany({
          where: {
            id: parseInt(id),
          },
          data: {
            active: false,
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao deletar o produto" });
        });

      await prisma.prod_functionalities
        .updateMany({
          where: {
            products_id: parseInt(id),
          },
          data: {
            active: false,
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao deletar o produto" });
        });

      await prisma.prod_accessories
        .updateMany({
          where: {
            products_id: parseInt(id),
          },
          data: {
            active: false,
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao deletar o produto" });
        });

      return res.status(200).json({
        message: "Produto deletado com sucesso",
      });
    } catch (error) {
      return res.json(error.message);
    }
  },
};
