import Mtienda from "../components/Mtienda"

const Tienda = ({carrito,setCarrito}) => {
  return (
    <>
    <h3 className="bg-black text-white py-3 text-center mt-3 mb-3">Tienda</h3>
    <Mtienda carrito={carrito} setCarrito={setCarrito}/>
 </>
  )
}

export default Tienda