import Mmovil from "../components/Mmovil"


const Movil = ({carrito, setCarrito}) => {
  return (
   <>
      <h3 className="bg-black text-white py-3 text-center mt-3 mb-3">Moviles</h3>
      <Mmovil carrito={carrito} setCarrito={setCarrito}/>
   </>
  )
}

export default Movil