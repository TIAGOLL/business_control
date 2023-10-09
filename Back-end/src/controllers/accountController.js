import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default {
    async findAllAccounts(req, res) {
        try {
            const accounts = await prisma.account.findMany();

            return res.json(accounts);
        } catch (error) {
            return res.json(error);
        }
    },
}