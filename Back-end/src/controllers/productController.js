import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {

    async findAllProducts(req, res) {
        try {
            const products = await prisma.product.findMany({
                include: {
                    category: true
                }
            });

            return res.json(products);
        } catch (error) {
            return res.json(error.message);
        }
    },

    async findProductById(req, res) {
        const { id } = req.params;

        try {
            const product = await prisma.product.findFirst(
                {
                    include: {
                        category: true
                    },
                    where: {
                        id: parseInt(id)
                    }

                }
            );

            return res.json(product);

        } catch (error) {
            return res.json(error.message);
        }
    },

    async createProduct(req, res) {
        const { name, sale_price, category_id, description } = req.body.data;

        const product = {
            name,
            category_id: parseInt(category_id),
            sale_price: parseFloat(sale_price),
            description
        }

        try {
            console.log('trying');
            await prisma.product.create({
                data: product
            }).catch((error) => {
                console.log(error.message);
                return res.json(error.message);
            })

            return res.json({
                message: 'Produto criado com sucesso',
                productCreated: product
            })

        } catch (error) {
            console.log(error.message)
            return res.json(error.message);
        }
    },

    async updateProduct(req, res) {
        const { name, sale_price, category_id, description } = req.body.data;
        const { id } = req.params;

        const product = {
            name,
            category_id: parseInt(category_id),
            sale_price: parseFloat(sale_price),
            description
        }

        try {
            console.log('trying');
            await prisma.product.update({
                where: {
                    id: parseInt(id)
                },
                data: product
            }).catch((error) => {
                console.log(error.message);
                return res.json(error.message);
            })

            return res.json({
                message: 'Produto criado com sucesso',
                productCreated: product
            })

        } catch (error) {
            console.log(error.message)
            return res.json(error.message);
        }
    },


    async deleteProduct(req, res) {
        const { id } = req.params;

        try {
            await prisma.product.deleteMany({
                where: {
                    id: parseInt(id)
                }
            })
                .catch((error) => {
                    console.log(error.message);
                    return res.json(error.message);
                });

            return res.json({
                message: 'Produto deletado com sucesso',
            })

        } catch (error) {
            return res.json(error.message);
        }
    },

    async findStockByProduct(req, res) {
        const { id } = req.params;
        try {
            const prodRequests = await prisma.request.findMany({
                include: {
                    prod_request: true,
                    status_tracking: true
                },
                where: {
                    prod_request: {
                        some: {
                            product_id: parseInt(id),
                        }
                    },
                    status_tracking: {
                        name: 'Entregue'
                    }
                },
            })
                .then((request) => {
                    return request
                })
                .catch((error) => {
                    console.log(error.message);
                    return error.message;
                });
            let totalQuantity = 0
            prodRequests.map((reqs) => {
                reqs.prod_request.map((prod) => {
                    if (prod.product_id == id) return totalQuantity = prod.quantity + totalQuantity;
                })
            })
            return res.json(totalQuantity);
        } catch (error) {
            return error.message;
        }
    },

    async findCurrentPurchasePriceByProduct(req, res) {
        const { id } = req.params;
        try {
            const prodRequests = await prisma.request.findMany({
                include: {
                    prod_request: true,
                },
                where: {
                    prod_request: {
                        some: {
                            product_id: parseInt(id),
                        }
                    },
                },
            })
                .then((request) => {
                    return request
                })
                .catch((error) => {
                    console.log(error.message);
                    return error.message;
                });
            if (prodRequests.length == 0) return res.json('Nenhum preço de compra encontrado'); // se não houver nenhuma request com o produto, retorna 0
            let currentPurchasePrice = 0;
            let currentRequest = 0;
            // pega a ultima request que contem o produto
            prodRequests.map((reqs) => {
                if (reqs.id > currentRequest) currentRequest = reqs.id;
            })
            // pega o preço de compra do produto na ultima request
            prodRequests.map((reqs) => {
                if (reqs.id == currentRequest) {
                    reqs.prod_request.map((prod) => {
                        if (prod.product_id == id) return currentPurchasePrice = prod.purchase_price;
                    })
                }
            })
            return res.json(currentPurchasePrice);
        } catch (error) {
            return error.message;
        }
    },

    async totalInvested(req, res) {
        try {
            const prodRequests = await prisma.request.findMany({
                include: {
                    prod_request: true,
                    status_tracking: true
                },
            })
                .then((request) => {
                    return request
                })
                .catch((error) => {
                    console.log(error.message);
                    return error.message;
                });
            let totalInvested = 0;
            prodRequests.map((reqs) => {
                reqs.prod_request.map((prod) => {
                    totalInvested = prod.purchase_price * prod.quantity + totalInvested;
                })
            })
            return res.json(totalInvested.toFixed(2));
        } catch (error) {
            return error.message;
        }
    },

}