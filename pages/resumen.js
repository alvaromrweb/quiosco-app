import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "../components/ResumenProducto"

export default function Resumen() {
    const {carrito} = useQuiosco()
    return (
        <Layout pagina="Resumen">
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu pedido</p>
            {carrito.length == 0 ? (
                <p className="text-center text-2xl">Carrito vacío</p>
            ) : (
                carrito.map(producto => (
                    <ResumenProducto key={producto.id} producto={producto} />
                ))
            )}
        </Layout>
    )
}