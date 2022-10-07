import {useRouter} from 'next/router'
import useQuiosco from '../hooks/useQuiosco'
import { useEffect } from 'react'

const pasos = [
    {paso: 1, nombre: 'Menú', url: '/', progreso: 2},
    {paso: 2, nombre: 'Resumen', url: '/resumen', progreso: 50},
    {paso: 3, nombre: 'Datos yTotal', url: '/total', progreso: 100},
]

const Pasos = () => {
    const {paso, setPaso} = useQuiosco()
    const router = useRouter()

    useEffect(() => {
      if(pasos.some(pasoFind => pasoFind.url === router.pathname)) {
        const pasoActual = pasos.find(pasoFind => pasoFind.url === router.pathname)
        setPaso(pasoActual)
      }
    }, [])
    

  return (
    <>
        <div className="flex gap-4 justify-between mb-5">
            {pasos.map(pasoMap => (
                <button 
                className="text-2xl font-bold" 
                key={pasoMap.paso} 
                onClick={() => {
                    setPaso(pasoMap)
                    router.push(pasoMap.url)
                }}
                >
                    {pasoMap.nombre}
                </button>
            ))}
        </div>
        <div className='bg-gray-100 mb-10'>
            <div className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white' style={{width: `${paso.progreso ? paso.progreso : 0}%`}}>

            </div>
        </div>
    </>
  )
}

export default Pasos