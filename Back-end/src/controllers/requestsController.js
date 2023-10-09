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
                    status_tracking: true
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

    // não funciona
    async updateRequest(req, res) {
        const { account_id, date, status_tracking, lot, store_name, tracking_id } = req.body;
        const { id } = req.params;

        const request = {
            account_id: parseInt(account_id),
            date: date,
            status_tracking: status_tracking,
            lot: parseInt(lot),
            store_name: store_name,
            tracking_id: tracking_id
        }

        try {
            await prisma.request.updateMany({
                where: {
                    id: parseInt(id)
                },
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