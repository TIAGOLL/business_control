import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async delete(req, res) {
    const { id } = req.params;

    try {
      await prisma.products.updateMany({
        where: {
          id: parseInt(id),
        },
        data: {
          active: false,
        },
      });

      await prisma.prod_colors.updateMany({
        where: {
          products_id: parseInt(id),
        },
        data: {
          active: false,
        },
      });

      await prisma.prod_functionalities.updateMany({
        where: {
          products_id: parseInt(id),
        },
        data: {
          active: false,
        },
      });

      await prisma.prod_accessories.updateMany({
        where: {
          products_id: parseInt(id),
        },
        data: {
          active: false,
        },
      });

      return res.json({
        message: "Produto deletado com sucesso",
      });
    } catch (error) {
      return res.json(error.message);
    }
  },
};
