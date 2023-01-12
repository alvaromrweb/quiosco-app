import { PrismaClient } from "@prisma/client"


export default async function handler(req, res) {
    const prisma = new PrismaClient()

    // Get pedidos
    const pedidos = await prisma.pedido.findMany({
        where: {
            estado: false
        }
    })
    res.status(200).json(pedidos)

    // Crear pedido
    if(req.method === 'POST') {
        const pedido = await prisma.pedido.create({
            data: {
                nombre: req.body.nombreCliente,
                total: req.body.total,
                pedido: req.body.carrito,
                fecha: req.body.fecha
            }
        })

        res.status(200).json(pedido)
    }

}
