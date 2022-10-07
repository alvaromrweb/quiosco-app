import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"

export default function Total() {
    const {carrito, total, nombreCliente, setNombreCliente, hacerPedido} = useQuiosco()

    const pedidoNoValido = () => {
        return carrito.length === 0 || nombreCliente === '' || nombreCliente.length < 3
    }

    return (
        <Layout pagina="Total">
            <h1 className="text-4xl font-black">Total</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>
            <form onSubmit={hacerPedido}>
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-700 font-bold text-xl">Nombre:</label>
                    <input id="nombre" type="text" className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md" value={nombreCliente} onChange={e => setNombreCliente(e.target.value)} />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: <span className="font-bold"> {formatearDinero(total)}</span></p>
                </div>
                <div className="mt-5">
                    <input 
                        className={`${pedidoNoValido() ? 'bg-indigo-100 cursor-not-allowed' : 'bg-indigo-600 cursor-pointer'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`} 
                        type="submit" 
                        value="Confirmar pedido" 
                        disabled={pedidoNoValido()}
                    />
                </div>
            </form>
        </Layout>
    )
}