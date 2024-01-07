import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async delete(req, res) {
    try {
      const { id } = req.params;

      const request = await prisma.requests
        .update({
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
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "Erro ao deletar pedido" });
        });

      return res.status(200).json({
        request: request,
        message: "Pedido deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar pedido" });
    }
  },
};
