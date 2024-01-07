import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async loadActives(req, res) {
    try {
      const products = await prisma.products
        .findMany({
          where: {
            active: true,
          },
          include: {
            prod_accessories: true,
            prod_categories: true,
            prod_functionalities: true,
          },
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.json({
        products: products,
        message: "Produtos ativos carregados com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadAvailables(req, res) {
    try {
      const products = await prisma.products
        .findMany({
          where: {
            active: true,
            quantity: {
              gt: 0,
            },
          },
          include: {
            prod_accessories: true,
            prod_categories: true,
            prod_functionalities: true,
          },
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        products: products,
        message: "Produtos ativos carregados com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadById(req, res) {
    const { id } = req.params;

    try {
      const products = await prisma.products
        .findFirst({
          include: {
            prod_accessories: true,
            prod_categories: true,
            prod_functionalities: true,
          },
          where: {
            id: parseInt(id),
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      const categories = await prisma.prod_categories
        .findMany({
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        products: products,
        categories: categories,
        message: "Dados carregados com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadDeleted(req, res) {
    try {
      const products = await prisma.products
        .findMany({
          where: {
            active: false,
          },
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        products: products,
        message: "Produtos deletados carregados com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadInTransit(req, res) {
    try {
      const products = await prisma.requests
        .findMany({
          where: {
            status_tracking_id: 1,
            active: true,
          },
          include: {
            prod_requests: {
              include: {
                products: true,
              },
            },
          },
        })
        .catch((error) => {
          console.log(error.message);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        products: products,
        message: "Produtos em trânsito carregados com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadOfCreate(req, res) {
    try {
      const categories = await prisma.prod_categories
        .findMany({
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        categories: categories,
        message: "Dados carregados com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },
};
