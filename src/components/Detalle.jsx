import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { PlusSquareFill } from 'react-bootstrap-icons';
import { DashCircleFill } from 'react-bootstrap-icons';
import { CartFill } from 'react-bootstrap-icons';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
//import MostrarCarrito from '../procesos/MostrarCarrito';
import { TrashFill } from 'react-bootstrap-icons';
//import imgDelete from '../assets/delete.png'


const Detalle = ({carrito, setCarrito, show, handleClose, productos}) => {
    const pv=parseFloat(productos.price-((productos.price*productos.discountPercentage)/100));
    const [cantidad, setCantidad] = useState(1)
    function disminuirCant(){
        if(cantidad>1){
            setCantidad((cantidad)=>cantidad-1)
        }   
    }
    function sumarCant(){
        setCantidad((cantidad)=>cantidad+1)
    }
    useEffect(()=>{
        setCantidad(1) 
    },[])


    const onAddProduct = (producto) => {
        const prod = producto;
        prod["cant"] = cantidad;
        // Verificar si el producto ya está en el carrito
        const productoExistenteIndex = carrito.findIndex((item) => item.id === prod.id);
        if (productoExistenteIndex !== -1) {
          // Si el producto ya existe, reemplazarlo en el carrito
          const carritoActualizado = [...carrito];
          carritoActualizado[productoExistenteIndex] = prod;
          setCarrito(carritoActualizado);
          mostrarMensage("¡Actualizado!","Producto actualizado en el carrito");
        } else {
          // Si el producto no existe, agregarlo al carrito
          setCarrito([...carrito, prod]);
          mostrarMensage("¡Agregado!","Producto agregado al carrito");
        }
        };

     const verCarrito = () => {
        let totalCantidad = 0;
        let totalPrecio = 0;
    
        const carritoTabla = carrito.map((producto) => {
        const subtotal = producto.price * producto.cant;
        totalCantidad += producto.cant;
        totalPrecio += subtotal;
    
        const precioFormateado = formatearMoneda(producto.price);
        const subtotalFormateado = formatearMoneda(subtotal);
    
        return `
            <tr>
                <td><img src="${producto.thumbnail}" alt="" class="imgCarrito"/> </td>
                <td>${producto.title}</td>
                <td>${producto.cant.toLocaleString("es", { useGrouping: true })}</td>
                <td>${precioFormateado}</td>
                <td>${subtotalFormateado}</td>
            </tr>
        `;
        }).join("");
    
        const totalPrecioFormateado = formatearMoneda(totalPrecio);
    
        const tablaHTML = `
        <div class="text-center">
            <table class="table table-striped table-bordered table-hover table-sm tablaCarrito" >
            <thead class="table-dark">
                <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
 
                </tr>
            </thead>
            <tbody>
                ${carritoTabla}
                <tr>
                <td colspan="2"></td>
                <td>${totalCantidad.toLocaleString("es", { useGrouping: true })}</td>
                <td></td>
                <td>${totalPrecioFormateado}</td>
                <td></td>
                </tr>
            </tbody>
            </table>
        </div>
        `;
    
        Swal.fire({
        position: "top-end",
        title: "Carrito",
        html: tablaHTML,
        width:'700px',
        });
    }

    function mostrarMensage(titulo,texto){
        Swal.fire({
            title: titulo,
            text: texto,
            icon: "success"
          });
    }

    const formatearMoneda = (valor) => {
        const resultado = valor.toLocaleString("es", {
          style: "currency",
          currency: "USD",
          useGrouping: true,
        });
      
        return resultado.replace("US$", "");
      };


  return (
   <>
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
            <Modal.Title>Detalle del producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-md-6'> 
                    <img src={productos.thumbnail} alt={productos.title}  className="img-fluid img-thumbnail" />
                    </div>
                    <div className='col-md-6'> 
                        <h5><b>Nombre: </b>{productos.title}</h5>
                        <p><b>Categoria: </b>{productos.category}</p>
                        <p><b>Marca: </b>{productos.brand}</p>
                        <p><b>Existencia: </b>{productos.stock}</p>
                        <p><b>Puntuación: </b><Badge bg="danger">{productos.rating}</Badge></p>
                        <p><b>Descripción: </b>{productos.description}</p>
                        <h5 className='text-success'><b>Precio: </b>{productos.price}</h5>
                        <h5 className='text-success'><b>Descuento: </b>{productos.discountPercentage}</h5>
                        <h5 className='text-danger'><b>Descuento: </b>{pv.toFixed(2).toLocaleString()}</h5>

                        <h5>Comprar</h5>

                        <div className='d-flex'>
                            <h5 className='text-danger pt-1'><b>Cantidad : </b> </h5>
                            <div className='d-flex justify-content-center mx-3 border-3 ' >
                                    <p className='p-1' type = "button" onClick={() => disminuirCant()}>
                                        <DashCircleFill color="red" size={30} />
                                    </p>
                                    <h4 className='p-1'>{cantidad}</h4>
                                    <p className='p-1' type = "button" onClick={() => sumarCant()}>
                                        <PlusSquareFill color="red" size={30}/>
                                    </p>
                            </div>
                        </div>
                        <button className='btn btn-danger me-2' onClick={() => onAddProduct(productos)}>  <CartFill  size={30} /> Agregar al Carrito</button>
                        <button className='btn btn-info me-2'   onClick={() =>  verCarrito() }>  <CartFill  size={30} /> Ver Carrito</button> 


                    </div>
                </div>


            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
   </>
  )
}

export default Detalle