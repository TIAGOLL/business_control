import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async post(req, res) {
    const {
      name,
      sale_price,
      category_id,
      photo_url,
      color,
      prod_functionalities,
      prod_accessories,
    } = req.body.data;

    try {
      await prisma
        .$transaction([
          prisma.products.create({
            data: {
              name: name,
              sale_price: parseFloat(sale_price),
              photo_url: photo_url,
              color: color,
              prod_categories: {
                connect: {
                  id: parseInt(category_id),
                },
              },
              prod_functionalities: {
                createMany: {
                  data: prod_functionalities.map((functionality) => {
                    return {
                      description: functionality.description,
                    };
                  }),
                },
              },
              prod_accessories: {
                createMany: {
                  data: prod_accessories.map((accessory) => {
                    return {
                      name: accessory.name,
                    };
                  }),
                },
              },
            },
          }),
        ])
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao criar Produto" });
        })
        .then(() => {
          return res.status(201).json({
            message: "Produto criado com sucesso",
          });
        });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar Produto" });
    }
  },
};
