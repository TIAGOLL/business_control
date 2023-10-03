import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {

    //funcionando
    async findAllCategories(req, res) {
        try {
            const categorias = await prisma.categorias.findMany();

            return res.json(categorias);
        } catch (error) {
            return res.json(error);
        }
    },
}