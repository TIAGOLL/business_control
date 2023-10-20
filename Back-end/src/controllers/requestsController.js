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

    async createRequest(req, res) {
        const { account_id, date, status_tracking_id, store_name, tracking_id, prod_request } = req.body.data;
        console.log(req.body.data)


        try {
            await prisma.request.create({
                data: {
                    date: date,
                    store_name: store_name,
                    tracking_id: tracking_id,
                    account: {
                        connect: {
                            id: parseInt(account_id)
                        }
                    },
                    status_tracking: {
                        connect: {
                            id: parseInt(status_tracking_id)
                        },
                    },
                    prod_request: {
                        create: prod_request.map((prod) => {
                            return {
                                product_id: parseInt(prod.product_id),
                                quantity: parseInt(prod.quantity),
                                purchase_price: parseFloat(prod.purchase_price)
                            }
                        })
                    }
                },
            })
                .catch((error) => {
                    console.log(error.message);
                    return error.message;
                });

            return res.json({ message: 'Pedido cadastrado com sucesso' });

        } catch (error) {
            return console.log(error.message)
        }
    },

    async updateRequest(req, res) {
        const { account_id, date, status_tracking_id, store_name, tracking_id, prod_request } = req.body.data;
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
                    account: {
                        connect: {
                            id: parseInt(account_id)
                        }
                    },
                    status_tracking: {
                        connect: {
                            id: parseInt(status_tracking_id)
                        },
                    },
                    prod_request: {
                        create: prod_request.map((prod) => {
                            return {
                                product_id: parseInt(prod.product_id),
                                quantity: parseInt(prod.quantity),
                                purchase_price: parseFloat(prod.purchase_price)
                            }
                        })
                    }
                },
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