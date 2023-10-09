import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default {
    async findAllPlatforms(req, res) {
        try {
            const platforms = await prisma.platform.findMany();

            return res.json(platforms);
        } catch (error) {
            return res.json(error);
        }
    },
}
