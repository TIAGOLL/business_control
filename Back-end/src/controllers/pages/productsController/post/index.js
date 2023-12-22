import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createProduct(req, res) {
    const { name, sale_price, category_id, description } = req.body.data;

    const product = {
      name,
      category_id: parseInt(category_id),
      sale_price: parseFloat(sale_price),
      description,
    };
    console.log(res);
    try {
      console.log("trying");
      await prisma.product
        .create({
          data: product,
        })
        .catch((error) => {
          return error.message;
        });

      return res.json({
        message: "Produto criado com sucesso",
        productCreated: product,
      });
    } catch (error) {
      return error.message;
    }
  },
};
