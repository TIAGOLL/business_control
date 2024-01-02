import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async post(req, res) {
    const {
      client_id,
      payment_type_id,
      coupon_id,
      coupon_discount,
      collaborators_id,
      total_sold,
      total_invested,
      prod_purchases,
      comission,
      porcent_rate,
      created_at,
    } = req.body;

    let { paid } = req.body;

    if (paid === "true") {
      paid = true;
    } else {
      paid = false;
    }

    const sale = await prisma.purchases
      .create({
        data: {
          clients: {
            connect: {
              id: parseInt(client_id),
            },
          },
          collaborators: {
            connect: {
              id: parseInt(collaborators_id),
            },
          },
          payment_types: {
            connect: {
              id: parseInt(payment_type_id),
            },
          },
          coupons: {
            connect: {
              id: parseInt(coupon_id),
            },
          },
          created_at: new Date(created_at).toISOString(),
          total_comission:
            (parseFloat(total_sold) - parseInt(total_invested)) *
            parseFloat(comission),
          total_sold: parseFloat(total_sold),
          paid: paid,
          prod_purchases: {
            create: prod_purchases.map((prod) => {
              return {
                products_id: parseInt(prod.products_id),
                quantity: parseInt(prod.quantity),
                sale_price: parseFloat(prod.sale_price),
                purchase_price: parseFloat(prod.purchase_price),
              };
            }),
          },
          total_profit:
            parseFloat(total_sold) -
            parseFloat(total_invested) -
            parseFloat(porcent_rate) * parseFloat(total_sold) -
            (parseFloat(total_sold) - parseInt(total_invested)) *
              parseFloat(comission) -
            parseFloat(total_sold) * parseFloat(coupon_discount),
        },
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Erro ao realizar o faturamento!",
        });
      });

    return res.status(201).json({
      sale: sale,
      message: "Faturamento realizado com sucesso!",
    });
  },
};
