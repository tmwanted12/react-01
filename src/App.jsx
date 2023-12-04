import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header"
import Footer from "../src/components/Footer"
import Inicio from "../src/pages/Inicio"
import Movil from './pages/Movil';
import Laptops from './pages/Laptops';
import Tienda from './pages/Tienda';
import Contacto from './pages/Contacto';
import { useEffect, useState } from 'react';


function App() {

  const [carrito, setCarrito] = useState([]);
  return (
    <>

        
      <BrowserRouter>
        <Header carrito={carrito} setCarrito={setCarrito}/>
          <Routes>
            <Route path="/Inicio" element={<Inicio/>} />
            <Route path="/" element={<Inicio/>} />
            <Route path="/Movil" element={<Movil carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="/Laptops" element={<Laptops carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="/Tienda" element={<Tienda carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="/Contacto" element={<Contacto/>} />
            <Route path="*" element={<Inicio/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>

    </>
  )
}

export default App
