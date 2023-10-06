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
}