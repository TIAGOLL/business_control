import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

export default {
  async loadAll(req, res) {
    const { date1, date2 } = req.query;

    try {
      let requests = await prisma.requests
        .findMany({
          where: {
            created_at: {
              gte: new Date(date1).toISOString(),
              lte: new Date(date2).toISOString(),
            },
          },
          include: {
            accounts: {
              include: {
                platforms: true,
              },
            },
            status_tracking: true,
            prod_requests: {
              include: {
                products: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        requests: requests,
        message: "Todos os pedidos foram carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadActives(req, res) {
    const { date1, date2 } = req.query;
    try {
      const requests = await prisma.requests
        .findMany({
          where: {
            active: true,
            created_at: {
              gte: new Date(date1).toISOString(),
              lte: new Date(date2).toISOString(),
            },
          },
          include: {
            accounts: {
              include: {
                platforms: true,
              },
            },
            status_tracking: true,
            prod_requests: {
              include: {
                products: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        requests: requests,
        message: "Pedidos ativos carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadWaitingForRefund(req, res) {
    const { date1, date2 } = req.query;
    try {
      const requests = await prisma.requests
        .findMany({
          where: {
            status_tracking: {
              name: "Esperando reembolso",
            },
            active: true,
            created_at: {
              gte: new Date(date1).toISOString(),
              lte: new Date(date2).toISOString(),
            },
          },
          include: {
            accounts: {
              include: {
                platforms: true,
              },
            },
            status_tracking: true,
            prod_requests: {
              include: {
                products: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        requests: requests,
        message: "Pedidos aguardando reembolso carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadRefunded(req, res) {
    const { date1, date2 } = req.query;
    try {
      const requests = await prisma.requests
        .findMany({
          where: {
            active: true,
            status_tracking_id: 4,
            created_at: {
              gte: new Date(date1).toISOString(),
              lte: new Date(date2).toISOString(),
            },
          },
          include: {
            accounts: {
              include: {
                platforms: true,
              },
            },
            status_tracking: true,
            prod_requests: {
              include: {
                products: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        requests: requests,
        message: "Pedidos reembolsados carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadInTransit(req, res) {
    const { date1, date2 } = req.query;
    try {
      const requests = await prisma.requests
        .findMany({
          where: {
            created_at: {
              gte: new Date(date1).toISOString(),
              lte: new Date(date2).toISOString(),
            },
            active: true,
            prod_requests: {
              every: {
                active: true,
              },
            },
            status_tracking_id: 1,
          },
          include: {
            accounts: {
              include: {
                platforms: true,
              },
            },
            status_tracking: true,
            prod_requests: {
              include: {
                products: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        requests: requests,
        message: "Pedidos em trânsito carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadCanceled(req, res) {
    const { date1, date2 } = req.query;
    try {
      const requests = await prisma.requests
        .findMany({
          where: {
            active: false,
            created_at: {
              gte: new Date(date1).toISOString(),
              lte: new Date(date2).toISOString(),
            },
          },
          include: {
            accounts: {
              include: {
                platforms: true,
              },
            },
            status_tracking: true,
            prod_requests: {
              include: {
                products: true,
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        requests: requests,
        message: "Pedidos cancelados carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadById(req, res) {
    try {
      const { id } = req.params;

      const requests = await prisma.requests
        .findUnique({
          where: {
            id: parseInt(id),
          },
          include: {
            accounts: {
              include: {
                platforms: true,
              },
            },
            status_tracking: true,
            prod_requests: {
              include: {
                products: true,
              },
            },
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        requests: requests,
        message: "Pedido carregado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },

  async loadOfCreate(req, res) {
    try {
      const products = await prisma.products
        .findMany({
          where: {
            active: true,
          },
          include: {
            prod_categories: true,
            prod_functionalities: true,
            prod_accessories: true,
          },
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      const accounts = await prisma.accounts
        .findMany({
          where: {
            active: true,
          },
          include: {
            platforms: true,
          },
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      const status_tracking = await prisma.status_tracking
        .findMany({
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      const platforms = await prisma.platforms
        .findMany({
          orderBy: {
            name: "asc",
          },
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao carregar dados" });
        });

      return res.status(200).json({
        products: products,
        accounts: accounts,
        platforms: platforms,
        status_tracking: status_tracking,
        message: "Dados carregado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao carregar dados" });
    }
  },
};
