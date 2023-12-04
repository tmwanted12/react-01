
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate} from 'react-router-dom';
//import MenuCategorias from './MenuCategorias';
import { useEffect, useState } from 'react';
import { CartFill } from 'react-bootstrap-icons';
import Swal from "sweetalert2";
import Badge from 'react-bootstrap/Badge';


import MostrarCarrito from './MostrarCarrito';

const Header = ({carrito, setCarrito}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [valueSearch, setValueSearch]=useState("")
  const [total, setTotal]=useState(0)
  const onSearchChange = (e) => {
      setValueSearch(e.target.value);
  };
  const navigate = useNavigate();

  const onSearchSubmit = e => {
    e.preventDefault();
    navigate('/Busquedas', {
      state: valueSearch,
    });	
  };

  useEffect(()=>{
    setTotal(carrito.length)
  },[carrito]);
  const formatearMoneda = (valor) => {
    const resultado = valor.toLocaleString("es", {
      style: "currency",
      currency: "USD",
      useGrouping: true,
    });
  
    return resultado.replace("US$", "");
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
            </tr>
        </tbody>
        </table>
    </div>
    `;

    Swal.fire({
    position: "top-end",
    title: "Carrito",
    html: tablaHTML,
    width: "800px", // Establece el ancho deseado aquí
    });
  }
 

  const MC=()=>{
    
    <MostrarCarrito carrito={carrito}  show={show} handleClose={handleClose}/>
    console.log("MC")
  }
  return (
    <>
        <Navbar expand="lg" className="bg-black " data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#"><img src={"img/logo.jpg"} alt="logo" width={100} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Link to="/Inicio" className="nav-link">Inicio</Link>
              <Link to="/Movil" className='nav-link'>Movil</Link>
              <Link to="/Laptops" className='nav-link'>Laptop</Link>
              <Link to="/Tienda" className='nav-link'>Tienda</Link>
              <Link  to="/Contacto" className='nav-link'>Contacto</Link>
            </Nav>
            <div>

              <button className='btn btn-danger me-2'   onClick={() =>  verCarrito() }>  <CartFill  size={25} /> <Badge bg="secondary">{total}</Badge></button>

              <button className='btn btn-info me-2'  onClick={handleShow} >  <CartFill  size={25} /> <Badge bg="secondary">{total}</Badge></button>
              
            </div>
          
            <Form className="d-flex" onSubmit={onSearchSubmit}>
              <input value={valueSearch} onChange={onSearchChange} type="search" placeholder="Search" className="form-control me-2 " aria-label="Search"/>
              <Button variant="outline-success" type='submit' >Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MostrarCarrito carrito={carrito} setCarrito={setCarrito} show={show} handleClose={handleClose}  />
    </>


  
  )
}

export default Header