import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async updateProduct(req, res) {
    const { name, sale_price, category_id, description } = req.body.data;
    const { id } = req.params;

    const product = {
      name,
      category_id: parseInt(category_id),
      sale_price: parseFloat(sale_price),
      description,
    };

    try {
      console.log("trying");
      await prisma.product
        .update({
          where: {
            id: parseInt(id),
          },
          data: product,
        })
        .catch((error) => {
          console.log(error.message);
          return res.json(error.message);
        });

      return res.json({
        message: "Produto criado com sucesso",
        productCreated: product,
      });
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },
};
