import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

export default {
  async loadAll(req, res) {
    try {
      let requests = await prisma.requests.findMany({
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
      });

      //formata todas as horas para o padrão brasileiro
      requests.map((item) => {
        item.created_at = moment(item.created_at).format("DD/MM/YYYY HH:mm:ss");
      });

      return res.json({
        requests: requests,
        message: "Todos os pedidos foram carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },

  async loadActives(req, res) {
    try {
      const requests = await prisma.requests.findMany({
        where: {
          active: true,
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
      });

      return res.json({
        requests: requests,
        message: "Pedidos ativos carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },

  async loadWaitingForRefund(req, res) {
    try {
      const requests = await prisma.requests.findMany({
        where: {
          status_tracking_id: 3,
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
      });

      return res.json({
        requests: requests,
        message: "Pedidos aguardando reembolso carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },

  async loadRefunded(req, res) {
    try {
      const requests = await prisma.requests.findMany({
        where: {
          status_tracking_id: 4,
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
      });

      return res.json({
        requests: requests,
        message: "Pedidos reembolsados carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },

  async loadInTransit(req, res) {
    try {
      const requests = await prisma.requests.findMany({
        where: {
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
      });

      return res.json({
        requests: requests,
        message: "Pedidos em trânsito carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },

  async loadCanceled(req, res) {
    try {
      const requests = await prisma.requests.findMany({
        where: {
          active: false,
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
      });

      return res.json({
        requests: requests,
        message: "Pedidos cancelados carregados com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },

  async loadById(req, res) {
    try {
      const { id } = req.params;

      const requests = await prisma.requests.findUnique({
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
      });

      const products = await prisma.products.findMany({
        include: {
          prod_categories: true,
          prod_functionalities: true,
          prod_accessories: true,
        },
      });

      const accounts = await prisma.accounts.findMany({
        include: {
          platforms: true,
        },
      });

      const status_tracking = await prisma.status_tracking.findMany();

      const platforms = await prisma.platforms.findMany();

      const colors = await prisma.prod_colors.findMany({
        select: {
          color: true,
          products_id: true,
        },
      });

      return res.json({
        requests: requests,
        products: products,
        accounts: accounts,
        platforms: platforms,
        colors: colors,
        status_tracking: status_tracking,
        message: "Pedido carregado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },
};
