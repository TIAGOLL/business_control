import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {

    //funcionando
    async findAllProducts(req, res) {
        try {
            const products = await prisma.product.findMany();

            return res.json(products);
        } catch (error) {
            
            return res.json(error);
        }
    },

    async createProduct(req, res) {
        const { id, nome, preco_venda, qtd, preco_compra, porcent_lucro, categorie } = req.body;

        try {
            console.log('trying');
            const product = await prisma.product.create({
                data: {
                    id: parseInt(id),
                    nome,
                    preco_venda: parseFloat(preco_venda),
                    qtd: parseInt(qtd),
                    preco_compra: parseFloat(preco_compra),
                    porcent_lucro: parseFloat(porcent_lucro)
                }
            })
                .then((product) => {
                    console.log('then');
                    return product;
                })
                .catch((error) => {
                    console.log('catch');
                    console.log(error);
                    return error;
                });

            return res.json(product);

        } catch (error) {
            return console.log(res.json(error))
        }
    },


    async updateProduct(req, res) {
        const { id, nome, preco_venda, qtd, preco_compra, porcent_lucro } = req.body;

        try {
            const product = await prisma.product.update({
                where: {
                    id
                },
                data: {
                    nome,
                    preco_venda,
                    qtd,
                    preco_compra,
                    porcent_lucro
                }
            });

            return res.json(product);
        } catch (error) {
            return res.json(error);
        }
    },


    async deleteProduct(req, res) {
        const { id } = req.params;

        try {
            const product = await prisma.product.delete({
                where: {
                    id
                }
            });

            return res.json(product);
        } catch (error) {
            return res.json(error);
        }
    },


    //funcionando
    async findProductById(req, res) {
        let { id } = req.params;
        id = parseInt(id);

        try {
            const product = await prisma.product.findUnique({
                where: {
                    id
                }
            })
                .then((product) => {
                    console.log('then');
                    console.log(product);
                    return product;
                })
                .catch((error) => {
                    console.log('catch');
                    console.log(error);
                });

            return res.json(product);

        } catch (error) {
            console.log(error)
            return res.json(error);
        }
    }
}