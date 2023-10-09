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
        const { name, quantity, sale_price, category_id, profit_porcent, description } = req.body;


        const product = {
            name,
            quantity: parseInt(quantity),
            category_id: parseInt(category_id),
            sale_price: parseFloat(sale_price),
            profit_porcent: parseFloat(profit_porcent),
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

    // não funciona
    async updateProduct(req, res) {
        const { name, quantity, sale_price, category_id, profit_porcent, description } = req.body;
        const { id } = req.params;
        console.log(req)
        const product = {
            name,
            quantity: parseInt(quantity),
            category_id: parseInt(category_id),
            sale_price: parseFloat(sale_price),
            profit_porcent: parseFloat(profit_porcent),
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


}