import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default {
    async findAllRequests(req, res) {
        try {
            const requests = await prisma.request.findMany();

            return res.json(requests);
        } catch (error) {
            return res.json(error);
        }
    },

    async createRequest(req, res) {
        const { date, idTracking, qtd_items, statusTracking, account_id, accounts_plataform_id, lote } = req.body;

        try {
            const request = await prisma.request.create({
                data: {
                    date,
                    idTracking,
                    qtd_items,
                    statusTracking,
                    account_id,
                    accounts_plataform_id,
                    lote
                }
            })
                .catch((error) => {
                    console.log(error);
                    return error;
                });

            return res.json(request);

        } catch (error) {
            return console.log(res.json(error))
        }
    },

    async updateRequest(req, res) {
        const { id, date, idTracking, qtd_items, statusTracking, account_id, accounts_plataform_id, lote } = req.body;

        try {
            const request = await prisma.request.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    date,
                    idTracking,
                    qtd_items,
                    statusTracking,
                    account_id,
                    accounts_plataform_id,
                    lote
                }
            })
                .catch((error) => {
                    console.log(error);
                    return error;
                });

            return res.json(request);

        } catch (error) {
            return console.log(res.json(error))
        }
    },

    async deleteRequest(req, res) {
        const { id } = req.body;

        try {
            const request = await prisma.request.delete({
                where: {
                    id: parseInt(id)
                }
            })
                .catch((error) => {
                    console.log(error);
                    return error;
                });

            return res.json(request);

        } catch (error) {
            return console.log(res.json(error))
        }
    }
}