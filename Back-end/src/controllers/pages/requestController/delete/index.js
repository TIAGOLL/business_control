import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async delete(req, res) {
    try {
      const { id } = req.params;

      const request = await prisma.requests.update({
        where: {
          id: Number(id),
        },
        data: {
          active: false,
          prod_requests: {
            updateMany: {
              where: {
                requests_id: Number(id),
              },
              data: {
                active: false,
              },
            },
          },
        },
      });

      return res.json({
        request: request,
        message: "Pedido deletado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message });
    }
  },
};
