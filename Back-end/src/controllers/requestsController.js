import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default {

    async findAllRequests(req, res) {
        try {
            const requests = await prisma.request.findMany({
                include: {
                    account: {
                        include: {
                            platform: true
                        },
                    },
                    status_tracking: true,
                    prod_request: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            return res.json(requests);
        } catch (error) {
            return res.json(error.message);
        }
    },

    async findRequestsById(req, res) {
        const { id } = req.params;

        try {
            const requests = await prisma.request.findFirst({
                include: {
                    status_tracking: true,
                    account: {
                        include: {
                            platform: true
                        },
                    },
                    prod_request: {
                        include: {
                            product: true
                        }
                    }
                },
                where: {
                    id: parseInt(id)
                }
            }).catch((error) => {
                console.log(error);
                return error;
            });

            return res.json(requests);
        } catch (error) {
            return res.json(error);
        }
    },

    // não funciona
    async createRequest(req, res) {
        const { account_id, date, status_tracking, lot, store_name, tracking_id } = req.body;

        console.log('createRequest')

        const request = {
            account_id: parseInt(account_id),
            date: date,
            status_tracking: status_tracking,
            lot: parseInt(lot),
            store_name: store_name,
            tracking_id: tracking_id
        }

        try {
            await prisma.request.create({
                data: request
            })
                .catch((error) => {
                    console.log(error);
                    return error.message;
                });

            return res.json(request);

        } catch (error) {
            return console.log(res.json(error.message))
        }
    },

    async updateRequest(req, res) {
        const { account_id, date, status_tracking_id, lot, store_name, tracking_id } = req.body.data;
        const { id } = req.params;
        console.log('updateRequest')
        console.log(req.body.data)
        try {
            await prisma.request.updateMany({
                where: {
                    id: parseInt(id)
                },
                data: {
                    date: date,
                    store_name: store_name,
                    tracking_id: tracking_id,
                    account_id: parseInt(account_id),
                    status_tracking_id: parseInt(status_tracking_id),
                    lot: parseInt(lot)
                }
            })
                .catch((error) => {
                    console.log(error.message);
                    return error.message;
                })
                .then((resp) => {
                    console.log(resp);
                    return res.json({ message: 'Pedido atualizado com sucesso' });
                });


        } catch (error) {
            return console.log(res.json(error.message))
        }
    },

    async deleteRequest(req, res) {
        const { id } = req.params;
        try {
            const request = await prisma.request.deleteMany({
                where: {
                    id: parseInt(id)
                }
            })
                .catch((error) => {
                    console.log(error.message);
                    return error.message;
                });

            return res.json(request);

        } catch (error) {
            return console.log(res.json(error.message))
        }
    }
}