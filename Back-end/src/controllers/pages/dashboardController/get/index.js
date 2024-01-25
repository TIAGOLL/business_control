import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

export default {
  async loadInfos(req, res) {
    let date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const saledMonths = [
      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month - 2, 0).toISOString(),
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
              gte: new Date(year, month - 1, 0).toISOString(),
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
              gte: new Date(year, month, 0).toISOString(),
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
              gte: new Date(year, month - 2, 0).toISOString(),
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
              gte: new Date(year, month - 1, 0).toISOString(),
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
              gte: new Date(year, month, 0).toISOString(),
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

    const profitMonths = [
      await prisma.purchases
        .aggregate({
          where: {
            created_at: {
              gte: new Date(year, month - 2, 0).toISOString(),
              lte: new Date(year, month - 1, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_profit: true,
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
              gte: new Date(year, month - 1, 0).toISOString(),
              lte: new Date(year, month, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_profit: true,
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
              gte: new Date(year, month, 0).toISOString(),
              lte: new Date(year, month + 1, 0).toISOString(),
            },
            active: true,
          },
          _sum: {
            total_profit: true,
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
                gte: new Date(year, month - 2, 0).toISOString(),
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
                gte: new Date(year, month - 1, 0).toISOString(),
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
              gte: new Date(year, month, 0).toISOString(),
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

    return res.status(200).json({
      totalMonthsSaled: saledMonths.map((saled) =>
        parseFloat(saled._sum.total_sold_with_coupon.toFixed(2))
      ),

      totalMonthsInvested: investedMonths.map((invested) =>
        parseFloat(invested._sum.total_purchased.toFixed(2))
      ),

      totalMonthsCost: costMonths.map((invested) =>
        parseFloat(invested._sum.total_invested.toFixed(2))
      ),
      totalRequestsInTransit: parseFloat(totalRequestsInTransit._count),
      profitMonths: profitMonths.map((profit) =>
        parseFloat(profit._sum.total_profit.toFixed(2))
      ),
      totalMonthComission: parseFloat(
        totalMonthComission._sum.total_comission.toFixed(2)
      ),
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
      productsWithCriticalStock: productsWithCriticalStock,
      message: "Dados carregados com sucesso",
    });
  },
};
