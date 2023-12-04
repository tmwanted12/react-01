import Detalle from "./Detalle"
import { useState } from 'react';
//import Swal from 'sweetalert2'


const Card = ({carrito, setCarrito, productos}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //function aumentar(vName) {

    //    Swal.fire(vName);
     //   ()=>aumentar(productos.title)
   // }

    //console.log(typeof(productos.price))
  return (
    
    <>
        <div className="col-md-4 col-lg-3 mb-4" >
        <div className="card h-100">
        <div className="card-header p-0">
            <img src={productos.thumbnail} alt={productos.title}  className="img-fluid" />
        </div>
        <div className="card-body text-center">
            <h5>{productos.title}</h5>
            <p className="text-success">{productos.brand}</p>
            <h5 className="text-danger">{productos.price.toFixed(1).toLocaleString()}$</h5>
        </div>
        <div className="card-footer text-center">
            <button className="btn btn-danger btn-sm mx-2"  onClick={handleShow}>Detalle</button>
        </div>
        </div>
    </div>
    <Detalle carrito={carrito} setCarrito={setCarrito} show={show} handleClose={handleClose} productos={productos}/>

    </>


    
  )
}

export default Card