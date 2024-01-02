import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async loadActives(req, res) {
    const { date1, date2 } = req.query;

    const sales = await prisma.purchases.findMany({
      where: {
        active: true,
        created_at: {
          gte: new Date(date1).toISOString(),
          lte: new Date(date2).toISOString(),
        },
      },
      include: {
        clients: true,
        payment_types: true,
        coupons: true,
        collaborators: true,
        prod_purchases: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.json({
      sales: sales,
      message: "Dados carregados com sucesso",
    });
  },

  async loadOfCreate(req, res) {
    const products = await prisma.products.findMany({
      where: {
        active: true,
        quantity: {
          gte: 1,
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const clients = await prisma.clients.findMany({
      where: {
        active: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const payment_types = await prisma.payment_types.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const cupons = await prisma.coupons.findMany({
      where: {
        active: true,
        final_date: {
          gte: new Date(),
        },
      },
      orderBy: {
        discount: "desc",
      },
    });

    const collaborators = await prisma.collaborators.findMany({
      where: {
        active: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.json({
      products: products,
      clients: clients,
      payment_types: payment_types,
      cupons: cupons,
      collaborators: collaborators,
      message: "Dados carregados com sucesso",
    });
  },
};
