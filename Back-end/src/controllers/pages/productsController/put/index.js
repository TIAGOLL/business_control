import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async update(req, res) {
    const {
      name,
      sale_price,
      color,
      category_id,
      photo_url,
      prod_functionalities,
      prod_accessories,
    } = req.body.data;
    const { id } = req.params;

    try {
      await prisma
        .$transaction([
          prisma.prod_functionalities.deleteMany({
            where: {
              products_id: parseInt(id),
            },
          }),

          prisma.prod_accessories.deleteMany({
            where: {
              products_id: parseInt(id),
            },
          }),

          prisma.products.update({
            where: {
              id: parseInt(id),
            },
            data: {
              prod_categories: {
                connect: {
                  id: parseInt(category_id),
                },
              },
              name: name,
              color: color,
              photo_url: photo_url,
              sale_price: parseFloat(sale_price),
            },
          }),
          prisma.prod_functionalities.createMany({
            data: prod_functionalities.map((functionality) => {
              return {
                products_id: parseInt(id),
                description: functionality.description,
              };
            }),
          }),
          prisma.prod_accessories.createMany({
            data: prod_accessories.map((accessory) => {
              return {
                products_id: parseInt(id),
                name: accessory.name,
              };
            }),
          }),
        ])
        .catch((error) => {
          console.log(error);
          return res.json({ message: "Erro ao atualizar Produto" });
        })
        .then(() => {
          return res.json({
            message: "Produto atualizado com sucesso",
          });
        });
    } catch (error) {
      console.log(error.message);
      return res.json(error.message);
    }
  },
};
