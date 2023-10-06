import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {

    async findAllProducts(req, res) {
        try {
            const products = await prisma.product.findMany();

            return res.json(products);
        } catch (error) {
            return res.json(error);
        }
    },


    async findProductById(req, res) {
        const { id } = req.params;

        try {
            const product = await prisma.product.findUnique(
                {
                    where: {
                        id: parseInt(id)
                    }
                }
            );

            res.sendStatus(200);
            return res.json(product);

        } catch (error) {
            return res.json(error.message);
        }
    },

    async createProduct(req, res) {
        const { name, quantity, inTransit, category_id } = req.body;

        try {
            console.log('trying');
            await prisma.product.create({
                data: {
                    name,
                    quantity: parseInt(quantity),
                    inTransit: parseInt(inTransit),
                    category_id: parseInt(category_id)
                }
            })

        } catch (error) {
            console.log(error.message)
            return res.json(error.message);
        }
    },


    async updateProduct(req, res) {
        const { name, quantity, inTransit, category_id } = req.body;
        const { id } = req.params;

        try {
            await prisma.product.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name,
                    quantity: parseInt(quantity),
                    inTransit: parseInt(inTransit),
                    category_id: parseInt(category_id)
                }
            })

        } catch (error) {
            console.log(error.message)
            return res.json(error.message);
        }
    },


    async deleteProduct(req, res) {
        const { id } = req.params;

        try {
            await prisma.product.delete({
                where: {
                    id: parseInt(id)
                }
            })
            .catch((error) => {
                console.log(error.message);
                return res.json(error.message);
            });

            return res.sendStatus(200);
        } catch (error) {
            return res.json(error.message);
        }
    },


}