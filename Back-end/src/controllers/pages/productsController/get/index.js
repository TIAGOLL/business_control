import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async loadActives(req, res) {
    try {
      const products = await prisma.products.findMany({
        where: {
          active: true,
        },
        include: {
          colors: true,
          prod_accessories: true,
          prod_categories: true,
          prod_colors: true,
          prod_functionalities: true,
        },
      });

      return res.json({
        products: products,
        message: "Produtos ativos carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },

  async loadAvailables(req, res) {
    try {
      const products = await prisma.products.findMany({
        where: {
          active: true,
          prod_colors: {
            some: {
              quantity: {
                gt: 1,
              },
            },
          },
        },
        include: {
          colors: true,
          prod_accessories: true,
          prod_categories: true,
          prod_colors: true,
          prod_functionalities: true,
        },
      });

      return res.json({
        products: products,
        message: "Produtos ativos carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },

  async loadById(req, res) {
    const { id } = req.params;

    try {
      const product = await prisma.products.findFirst({
        include: {
          prod_accessories: true,
          prod_categories: true,
          prod_colors: true,
          prod_functionalities: true,
        },
        where: {
          id: parseInt(id),
        },
      });

      return res.json({
        product: product,
        message: "Produto carregado com sucesso!",
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async loadDeleted(req, res) {
    try {
      const products = await prisma.products.findMany({
        where: {
          active: false,
        },
      });

      return res.json({
        products: products,
        message: "Produtos deletados carregados com sucesso!",
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async loadInTransit(req, res) {
    try {
      const products = await prisma.requests.findMany({
        where: {
          status_tracking: {
            name: "Em trânsito",
          },
        },
        include: {
          prod_requests: {
            include: {
              products: true,
            },
          },
        },
      });

      return res.json({
        products: products,
        message: "Produtos em trânsito carregados com sucesso!",
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
