import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

export default {
  async loadInfos(req, res) {
    let date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const howMuchToReceive = await prisma.purchases.aggregate({
      where: {
        active: true,
        paid: false,
      },
      _sum: {
        total_sold_with_coupon: true,
      },
    });

    const saledMonths = [
      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month - 2, 1).toISOString(),
              lte: new Date(year, month - 1, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_sold_with_coupon: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),
      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month - 1, 1).toISOString(),
              lte: new Date(year, month, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_sold_with_coupon: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),
      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month, 1).toISOString(),
              lte: new Date(year, month + 1, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_sold_with_coupon: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),
    ];

    const costMonths = [
      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month - 2, 1).toISOString(),
              lte: new Date(year, month - 1, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_invested: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),
      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month - 1, 1).toISOString(),
              lte: new Date(year, month, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_invested: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),

      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month, 1).toISOString(),
              lte: new Date(year, month + 1, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_invested: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),
    ];

    const totalGeral = {
      purchased:
        await prisma.$queryRaw`select sum(total_sold_with_coupon) as total from purchases where active = 1;`,
      requested:
        await prisma.$queryRaw`select sum(purchase_price*quantity) as total from prod_requests where active = 1`,
    };

    const totalVendasXInvestimento = await prisma.purchases.aggregate({
      where: {
        active: true,
      },
      _sum: {
        total_sold_with_coupon: true,
        total_invested: true,
      },
    });

    const profitMonths = [
      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month - 2, 1).toISOString(),
              lte: new Date(year, month - 1, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_sold_with_coupon: true,
            total_invested: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),

      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month - 1, 1).toISOString(),
              lte: new Date(year, month, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_sold_with_coupon: true,
            total_invested: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),

      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month, 1).toISOString(),
              lte: new Date(year, month + 1, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_sold_with_coupon: true,
            total_invested: true,
          },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),
    ];

    const investedMonths = [
      await prisma.prod_requests
        .aggregate({
          where: {
            requests: {
              created_at: {
                gte: new Date(year, month - 2, 1).toISOString(),
                lte: new Date(year, month - 1, 0).toISOString(),
              },
            },
            active: true,
          },
          _sum: { total_purchased: true },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),
      await prisma.prod_requests
        .aggregate({
          where: {
            requests: {
              created_at: {
                gte: new Date(year, month - 1, 1).toISOString(),
                lte: new Date(year, month, 0).toISOString(),
              },
            },
            active: true,
          },
          _sum: { total_purchased: true },
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        }),
      await prisma.prod_requests.aggregate({
        where: {
          requests: {
            created_at: {
              gte: new Date(year, month, 1).toISOString(),
              lte: new Date(year, month + 1, 0).toISOString(),
            },
          },
          active: true,
        },
        _sum: { total_purchased: true },
      }),
    ];

    const productsWithCriticalStock = await prisma.products
      .findMany({
        where: {
          quantity: {
            lte: 1,
          },
        },
        select: {
          id: true,
          full_name: true,
        },
        orderBy: {
          prod_requests: {
            _count: "desc",
          },
        },
        take: 5,
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });

    const totalRequestsInTransit = await prisma.requests
      .aggregate({
        where: {
          status_tracking_id: 1,
          active: true,
        },
        _count: true,
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });

    const totalMonthComission = await prisma.purchases.aggregate({
      where: {
        created_at: {
          gte: new Date(year, month, 1).toISOString(),
        },
      },
      _sum: {
        total_comission: true,
      },
    });

    const totalMoneyInStock =
      await prisma.$queryRaw`SELECT SUM(purchase_price * quantity) AS total FROM products;`;

    return res.status(200).json({
      totalMonthsSaled: saledMonths.map((saled) => {
        if (saled._sum.total_sold_with_coupon == null) {
          return 0;
        }
        return parseFloat(saled._sum.total_sold_with_coupon.toFixed(2));
      }),

      totalMoneyInStock: totalMoneyInStock.map((total) => {
        if (total.total == null) {
          return 0;
        }
        return parseFloat(total.total.toFixed(2));
      })[0],

      totalMonthsInvested: investedMonths.map((invested) => {
        if (invested._sum.total_purchased == null) {
          return 0;
        }
        return parseFloat(invested._sum.total_purchased.toFixed(2));
      }),

      totalMonthsCost: costMonths.map((invested) => {
        if (invested._sum.total_invested == null) {
          return 0;
        }
        return parseFloat(invested._sum.total_invested.toFixed(2));
      }),
      totalRequestsInTransit: parseFloat(totalRequestsInTransit._count),
      profitMonths: profitMonths.map((profit) => {
        if (
          profit._sum.total_invested == null ||
          profit._sum.total_sold_with_coupon == null
        ) {
          return 0;
        }
        const total =
          parseFloat(profit._sum.total_sold_with_coupon.toFixed(2)) -
          parseFloat(profit._sum.total_invested.toFixed(2));
        return total;
      }),
      totalMonthComission: totalMonthComission._sum.total_comission
        ? parseFloat(totalMonthComission._sum.total_comission.toFixed(2))
        : 0,
      months: [
        new Date(year, month - 2, 1).toLocaleDateString("day", {
          month: "long",
        }),
        new Date(year, month - 1, 1).toLocaleDateString("day", {
          month: "long",
        }),
        new Date(year, month, 1).toLocaleDateString("day", {
          month: "long",
        }),
      ],
      howMuchToReceive: howMuchToReceive._sum.total_sold_with_coupon,
      productsWithCriticalStock: productsWithCriticalStock,
      message: "Dados carregados com sucesso",
      totalGeral,
      totalVendasXInvestimento,
    });
  },
};
