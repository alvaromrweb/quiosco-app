import React from 'react'
import Image from 'next/image'
import {formatearDinero} from '../helpers'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Pedido({pedido}) {

    const completarPedido = async () => {
        try {
            const data = await axios.put(`/api/pedidos/${pedido.id}`)
            toast.success('Pedido completado')
        } catch (error) {
            console.log(error)
            toast.error('Hubo un error al completar el pedido')
        }
    }
  return (
    <div className='border p-10 space-y-5'>
        <h3 className="text-2xl font-bold">Pedido: {pedido.id}</h3>
        <p className="text-lg font-bold">Cliente: {pedido.nombre}</p>

        <div>
            {pedido.pedido.map(producto => (
                <div key={producto.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                    <div className='w-32'>
                        <Image width={400} height={500} src={`/assets/img/${producto.imagen}.jpg`} alt={`Imagen producto ${producto.nombre}`} />
                    </div>
                    <div className='p-5 space-y-2'>
                        <h4 className='text-xl font-bold text-amber-500'>{producto.nombre}</h4>
                        <p className='text-lg font-bold'>Cantidad: {producto.cantidad}</p>
                        <p className='text-lg font-bold'>Precio: {producto.precio} €</p>
                    </div>
                </div>
            ))}
        </div>

        <div className='md:flex md:items-center md:justify-between my-10'>
            <p className='mt-5 font-black text-4xl '>Total a pagar: {formatearDinero(pedido.total)}</p>
            <button className='bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold' onClick={completarPedido}>
                Completar pedido
            </button>
        </div>
    </div>
  )
}
