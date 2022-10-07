import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"
import { useState, useEffect } from "react"

const ModalProducto = () => {
    const { productoActual, toggleModal, agregarCarrito, carrito } = useQuiosco()
    const [cantidad, setCantidad] = useState(1)
    const [editando, setEditando] = useState(false)

    useEffect(() => {
        setEditando(false)
        if (carrito.some( articulo => articulo.id === productoActual.id)) {
            setEditando(true)
            const productoEdit = carrito.find(articulo => articulo.id === productoActual.id)

            setCantidad(productoEdit.cantidad)
        }
    }, [productoActual, carrito])
    

  return (
    <div className='md:flex gap-10'>
        <div className='md:w-1/3'>
            <Image src={`/assets/img/${productoActual.imagen}.jpg`} alt={`Imagen producto ${productoActual.nombre}`} width={400} height={500} />
        </div>
        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button onClick={toggleModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </button>
            </div>
            <h1 className="text-3xl font-bold mt-5">{productoActual.nombre}</h1>
            <p className="mt-5 font-black text-5xl text-amber-500">{formatearDinero(productoActual.precio)}</p>

            <div className="flex gap-4 mt-5">
                <button type="button" onClick={() => {
                    if(cantidad <= 1) return
                    setCantidad(cantidad - 1)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <p className="text-3xl">{cantidad}</p>
                <button type="button" onClick={() => {
                    if(cantidad >= 5) return
                    setCantidad(cantidad + 1)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <button 
              type="button" 
              className="bg-orange-400 hover:bg-orange-500 text-white mt-5 py-3 px-8 uppercase font-bold" 
              onClick={() => {
                agregarCarrito({...productoActual, cantidad})
                toggleModal()
              }}
            >
              {editando ? 'Guardar cambios' : 'Añadir al pedido'}
            </button>
            
        </div>
    </div>
  )
}

export default ModalProducto