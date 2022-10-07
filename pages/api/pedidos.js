import { PrismaClient } from "@prisma/client"


export default async function handler(req, res) {
    const prisma = new PrismaClient()

    if(req.method === 'POST') {
        const pedido = await prisma.pedido.create({
            data: {
                nombre: req.body.nombreCliente,
                total: req.body.total,
                pedido: req.body.carrito,
                fecha: req.body.fecha
            }
        })

        res.json(pedido)
    }

}
