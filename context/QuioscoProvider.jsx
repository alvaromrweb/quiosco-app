import {createContext, useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify';
import {useRouter} from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [productoActual, setProductoActual] = useState({})
    const [modal, setModal] = useState(false)
    const [carrito, setCarrito] = useState([])
    const [paso, setPaso] = useState(1)
    const [total, setTotal] = useState(0)
    const [nombreCliente, setNombreCliente] = useState('')

    const router = useRouter()

    const getCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
        
    }

    useEffect(() => {
      getCategorias()
    }, [])

    useEffect(() => {
      setCategoriaActual(categorias[0])
    }, [categorias])
    
    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id == id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const toggleModal = () => {
        setModal(!modal)
    }

    const agregarCarrito = ({idCategoria, ...producto}) => {
        // Comprobar si esta ya en el carrito ese producto
        if (carrito.some( articulo => articulo.id === producto.id)) {
          const carritoActualizado = carrito.map( articulo => {
            if(articulo.id === producto.id) {
              articulo.cantidad = parseInt(producto.cantidad)
            }
            return articulo
          })
          setCarrito(carritoActualizado)
          toast.success("Cantidad actualizada", {autoClose: 2000})
        } else {
          setCarrito([...carrito, producto])
          toast.success("Agregado al carrito", {autoClose: 2000})
        }
      }
    
      const cambiarCantidad = (producto) => {
        const carritoActualizado = carrito.map( articulo => {
          if(articulo.id === producto.id) {
            articulo.cantidad = parseInt(producto.cantidad)
          }
          return articulo
        })
        setCarrito(carritoActualizado)
      }
    
      const eliminarProducto = (id) => {
        if(confirm('¿Estás seguro de que quieres eliminar este producto?')) {
          const carritoActualizado = carrito.filter( articulo => articulo.id != id)
          setCarrito(carritoActualizado)

        }
      }

      const hacerPedido = async (e) => {
        e.preventDefault()
        try {
          await axios.post('/api/pedidos', {carrito, nombreCliente, total, fecha: Date.now().toString()})

          toast.success('Pedido realizado correctamente')
          
          // Resetear la app
          setCategoriaActual(categorias[0])
          setCarrito([])
          setPaso(1)
          setNombreCliente('')
          setTotal(0)

          setTimeout(() => {
            router.push('/')
          }, 3000);

        } catch (error) {
          console.log(error)
          
        }
    }


    useEffect(() => {
        const calculoTotal = carrito.reduce((total, producto) => total + producto.cantidad * producto.precio, 0)
        setTotal(calculoTotal)
    }, [carrito])
    

    return (
        <QuioscoContext.Provider 
        value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            productoActual,
            setProductoActual,
            modal,
            toggleModal,
            carrito,
            agregarCarrito,
            cambiarCantidad,
            eliminarProducto,
            paso,
            setPaso,
            total,
            setTotal,
            nombreCliente,
            setNombreCliente,
            hacerPedido
        }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext