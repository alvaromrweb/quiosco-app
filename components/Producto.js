import Image from "next/image"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const Producto = ({producto}) => {
  const {setProductoActual, toggleModal} = useQuiosco()
  return (
    <div className='border p-3'>
        <Image src={`/assets/img/${producto.imagen}.jpg`} alt={`Imagen ${producto.nombre}`} width={400} height={500} />
        <div className="p-5">
            <h3 className="text-2xl font-bold">{producto.nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(producto.precio)}</p>

            <button 
              type="button" 
              className="bg-orange-400 hover:bg-orange-500 text-white w-full mt-5 p-3 uppercase font-bold" 
              onClick={e => {
                setProductoActual(producto)
                toggleModal()
              }}
            >
              Agregar
            </button>
        </div>
    </div>
  )
}

export default Producto