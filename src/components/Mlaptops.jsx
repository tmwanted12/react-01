import { useState, useEffect } from "react";
import Card from "./Card";
const API='https://dummyjson.com/products/category/laptops';



const Mlaptops = ({carrito,setCarrito}) => {
  const [datos, setDatos] = useState([])
	const getDatos = async () =>{
    try {
      const response = await fetch(API);
      const data = await response.json();
      console.log(data)
      setDatos(data.products);
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(()=>{
    getDatos();
  },[]);

  return (
    <div className="container">
    <div className="row">
        {datos && datos.map((productos)=>(
          <Card carrito={carrito} setCarrito={setCarrito} productos={productos} key={productos.id}/>
        ))}
    </div>
  </div>
  )
}

export default Mlaptops