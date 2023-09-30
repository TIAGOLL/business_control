import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = fastify();

const prisma = new PrismaClient();

app.get("/products", async () => {
    const products = await prisma.product.findMany(
        {
            where: {id: 0}
        }
    );

    return { products }
});

app.post("/products/create", async (req) => {
    const { id, nome, preco_venda, qtd, preco_compra, porcent_lucro } = req.body;

    const product = await prisma.product.create({
        data: {
            id,
            nome,
            preco_venda,
            qtd,
            preco_compra,
            porcent_lucro
        }
    });

    return { product }
});

app.listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    host: '0.0.0.0'
})
    .then(() => { 
        console.log("Server is running on port 3000");
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });