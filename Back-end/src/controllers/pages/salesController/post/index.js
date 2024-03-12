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

    const total_coupon_discount =
      parseFloat(coupon_discount) * parseFloat(total_sold);

    const total_rate =
      parseFloat(porcent_rate) *
      (parseFloat(total_sold) - total_coupon_discount);

    const total_sold_with_coupon =
      parseFloat(total_sold) -
      parseFloat(total_sold) * parseFloat(coupon_discount);

    const total_comission =
      (total_sold_with_coupon - total_invested) * parseFloat(comission);

    const final_total_sold =
      parseFloat(total_sold) -
      total_rate -
      total_coupon_discount -
      total_comission;

    const total_profit = parseFloat(total_sold) - total_sold_with_coupon;

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
          paid: paid,
          total_coupon_discount: total_coupon_discount,
          created_at: new Date(created_at).toISOString(),
          total_comission: total_comission,
          total_sold: parseFloat(total_sold),
          total_rate: total_rate,
          total_sold_with_coupon: total_sold_with_coupon,
          final_total_sold: final_total_sold,
          total_invested: parseFloat(total_invested),
          total_profit: total_profit,
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
        },
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Erro ao realizar o faturamento!",
        });
      });

    //atualiza o estoque dos produtos
    prod_purchases.map(async (prod) => {
      await prisma.products
        .update({
          where: {
            id: parseInt(prod.products_id),
          },
          data: {
            quantity: {
              decrement: parseInt(prod.quantity),
            },
          },
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(500)
            .json({ message: "Erro ao atualizar estoque do produto" });
        });
    });

    //atualiza o total comprado pelo cliente
    await prisma.clients
      .update({
        where: {
          id: parseInt(client_id),
        },
        data: {
          total_purchased: {
            increment: parseFloat(total_sold_with_coupon),
          },
        },
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Erro ao atualizar total comprado pelo cliente" });
      });

    return res.status(201).json({
      sale: sale,
      message: "Faturamento realizado com sucesso!",
    });
  },
};
