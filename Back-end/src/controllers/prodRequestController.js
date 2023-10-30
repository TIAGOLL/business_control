import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export default {
    async findAllProdRequests(req, res) {
        const { id } = req.params;
        try {
            const prodRequests = await prisma.prod_request.findMany({
                where: {
                    product_id: parseInt(id)
                },
            });

            return res.json(prodRequests);
        } catch (error) {
            return error.message;
        }
    },

    async findProdrequestsIfdelivered(req, res) {
        const { id } = req.params;
        try {
            const prodRequests = await prisma.prod_request.findMany({
                where: {
                    product_id: parseInt(id),
                    status_tracking_id: 4
                },
            });

            return res.json(prodRequests);
        } catch (error) {
            return error.message;
        }
    },
}
