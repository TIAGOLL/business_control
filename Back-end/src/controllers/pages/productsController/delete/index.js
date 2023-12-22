import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      await prisma.product
        .deleteMany({
          where: {
            id: parseInt(id),
          },
        })
        .catch((error) => {
          console.log(error.message);
          return res.json(error.message);
        });

      return res.json({
        message: "Produto deletado com sucesso",
      });
    } catch (error) {
      return res.json(error.message);
    }
  },
};
