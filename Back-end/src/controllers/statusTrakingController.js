import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default {

    async findAllStatusTracking(req, res) {
        try {
            const statusTracking = await prisma.status_tracking.findMany();

            return res.json(statusTracking);
        } catch (error) {
            return res.json(error.message);
        }
    },
}