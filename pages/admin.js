import AdminLayout from "../layout/AdminLayout"
import axios from "axios"
import useSWR from 'swr'
import Pedido from "../components/Pedido"

export default function Admin() {
    const fetcher = url => axios(url).then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, {refreshInterval: 100})

    console.log(data)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return (
        <AdminLayout pagina="Admin">
            <h1 className="text-4xl font-black">Panel de administración</h1>
            <p className="text-2xl my-10">Administra los pedidos</p>

            {data && data.length ? data.map(pedido => (
                <Pedido key={pedido.id} pedido={pedido} />
            )) 
            : <p>No hay pedidos pendientes</p> }
        </AdminLayout>
    )
}