import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

const Categoria = ({categoria}) => {
    const {categoriaActual, handleClickCategoria} = useQuiosco()
  return (
    <div className={`${categoriaActual?.id == categoria.id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-300 cursor-pointer`} onClick={e => handleClickCategoria(categoria.id)}>
        <Image  width={70} height={70} src={`/assets/img/icono_${categoria.icono}.svg`} alt="Icono categoria" />
        <button type="button" className="text-2xl font-bold">{categoria.nombre}</button>
    </div>
  )
}

export default Categoria