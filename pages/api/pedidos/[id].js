import { PrismaClient } from "@prisma/client"


export default async function handler(req, res) {
    const prisma = new PrismaClient()

    // Actualizar pedido
    if(req.method === 'PUT') {
        const{id} = req.query

        const pedidoActualizado = await prisma.pedido.update({
            where: {
                id: parseInt(id)
            },
            data: {
                estado: true
            }
        })
        res.status(200).json(pedidoActualizado)
    }

}
