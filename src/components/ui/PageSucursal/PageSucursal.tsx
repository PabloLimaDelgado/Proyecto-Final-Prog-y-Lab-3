
import { Button } from "react-bootstrap";
import { CardSucursal } from "../CardSucursal/CardSucursal";
import "./PageSucursal.css";
import { IoIosExit } from "react-icons/io";


export interface ISUCURSAL {
  nombre: string;
  nombreEmpresa: string;
  horarioApertura: string;
  horarioCierra: string;
  pais: string;
  provincia: string;
  latitud: string;
  longitud: string;
  nombreCalle: string;
  numeroCalle: number;
  codigoPostal: number;
  numeroPiso: number | null;
  numeroDepartamento: number | null;
  imagen: string;
}

export const PageSucursal = () => {
  const sucursalEjemplo: ISUCURSAL = {
    nombre: "Sucursal Centro",
    nombreEmpresa: "Bendito Rufian",
    horarioApertura: "09:00:00",
    horarioCierra: "18:00:00",
    pais: "Argentina",
    provincia: "Buenos Aires",
    latitud: "-34.6037",
    longitud: "-58.3816",
    nombreCalle: "Avenida Corrientes",
    numeroCalle: 1234,
    codigoPostal: 1043,
    numeroPiso: 3,
    numeroDepartamento: 12,
    imagen:
      "https://i.pinimg.com/564x/d3/b9/6b/d3b96b5244bdfa0001a95168686e469a.jpg",
  };


  return (
    <div className="cardSucursalSide">
    <div className="d-flex w-100 justify-content-around align-items-center " style={{width:'100%'}}>
    <h1 className="w-100 ">Sucursales en: {sucursalEjemplo.nombreEmpresa}</h1>
    <div className="w-25 h-50 d-flex justify-content-between px-4">
      <button className="edit" style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span className="material-symbols-outlined">edit</span>
      </button>
    <Button variant="outline-danger m-0" className="d-flex align-item-center justify-contet-center" style={{ margin:0 , width:'30%'}}>
     <IoIosExit size={50}/>
    </Button>
    </div>
    </div>
    <div className="cartaSucursalContainer">
      <CardSucursal sucursal={sucursalEjemplo}/>
      <CardSucursal sucursal={sucursalEjemplo}/>
      <CardSucursal sucursal={sucursalEjemplo}/>
      <div className="cardSucursalButton">
          <button>
            <h2>Agregar sucursal</h2>
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
    </div>
    </div>

  );
};
