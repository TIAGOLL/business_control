import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {

    //funcionando
    async findAllCategorys(req, res) {
        try {
            const categorys = await prisma.category.findMany();
            return res.json(categorys);
        } catch (error) {
            return res.json(error);
        }
    },

    async findCategorysById(req, res) {
        const { id } = req.params;

        try {
            const categorys = await prisma.category.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            return res.json(categorys);
        } catch (error) {
            return res.json(error);
        }
    },
}