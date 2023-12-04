import Mlaptops from "../components/Mlaptops"
const Laptops = ({carrito,setCarrito}) => {
  return (
    <>
    <h3 className="bg-black text-white py-3 text-center mt-3 mb-3">Laptop</h3>
    <Mlaptops carrito={carrito} setCarrito={setCarrito}/>
    </>
  )
}

export default Laptops