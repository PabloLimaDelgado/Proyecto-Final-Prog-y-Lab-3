import { useState } from "react";
import "./CardSucursal.css";
import { useShow } from "../../../hooks/useShow.ts";

interface ISUCURSAL {
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

export const CardSucursal = () => {
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

  const { showCard, handleMouseEnter, handleMouseLeave } = useShow();

  return (
    <div className="cartaContainer">
      <div
        className="carta"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{`${sucursalEjemplo.nombreEmpresa} - ${sucursalEjemplo.nombre}`}</h1>
        <p>{`Apertura ${sucursalEjemplo.horarioApertura} - ${sucursalEjemplo.horarioCierra}`}</p>
        <img src={sucursalEjemplo.imagen} alt="" />

        {showCard && (
          <div>
            <button className="location">
              <span className="material-symbols-outlined">location_city</span>
            </button>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        )}
      </div>

      <div
        className="carta"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{`${sucursalEjemplo.nombreEmpresa} - ${sucursalEjemplo.nombre}`}</h1>
        <p>{`Apertura ${sucursalEjemplo.horarioApertura} - ${sucursalEjemplo.horarioCierra}`}</p>
        <img src={sucursalEjemplo.imagen} alt="" />

        {showCard && (
          <div>
            <button className="location">
              <span className="material-symbols-outlined">location_city</span>
            </button>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        )}
      </div>

      <div
        className="carta"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{`${sucursalEjemplo.nombreEmpresa} - ${sucursalEjemplo.nombre}`}</h1>
        <p>{`Apertura ${sucursalEjemplo.horarioApertura} - ${sucursalEjemplo.horarioCierra}`}</p>
        <img src={sucursalEjemplo.imagen} alt="" />

        {showCard && (
          <div>
            <button className="location">
              <span className="material-symbols-outlined">location_city</span>
            </button>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        )}
      </div>

      <div
        className="carta"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{`${sucursalEjemplo.nombreEmpresa} - ${sucursalEjemplo.nombre}`}</h1>
        <p>{`Apertura ${sucursalEjemplo.horarioApertura} - ${sucursalEjemplo.horarioCierra}`}</p>
        <img src={sucursalEjemplo.imagen} alt="" />

        {showCard && (
          <div>
            <button className="location">
              <span className="material-symbols-outlined">location_city</span>
            </button>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        )}
      </div>

      <div
        className="carta"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{`${sucursalEjemplo.nombreEmpresa} - ${sucursalEjemplo.nombre}`}</h1>
        <p>{`Apertura ${sucursalEjemplo.horarioApertura} - ${sucursalEjemplo.horarioCierra}`}</p>
        <img src={sucursalEjemplo.imagen} alt="" />

        {showCard && (
          <div>
            <button className="location">
              <span className="material-symbols-outlined">location_city</span>
            </button>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        )}
      </div>

      <div
        className="carta"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{`${sucursalEjemplo.nombreEmpresa} - ${sucursalEjemplo.nombre}`}</h1>
        <p>{`Apertura ${sucursalEjemplo.horarioApertura} - ${sucursalEjemplo.horarioCierra}`}</p>
        <img src={sucursalEjemplo.imagen} alt="" />

        {showCard && (
          <div>
            <button className="location">
              <span className="material-symbols-outlined">location_city</span>
            </button>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        )}
      </div>

      <div
        className="carta"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{`${sucursalEjemplo.nombreEmpresa} - ${sucursalEjemplo.nombre}`}</h1>
        <p>{`Apertura ${sucursalEjemplo.horarioApertura} - ${sucursalEjemplo.horarioCierra}`}</p>
        <img src={sucursalEjemplo.imagen} alt="" />

        {showCard && (
          <div>
            <button className="location">
              <span className="material-symbols-outlined">location_city</span>
            </button>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        )}
      </div>

      <div
        className="carta"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{`${sucursalEjemplo.nombreEmpresa} - ${sucursalEjemplo.nombre}`}</h1>
        <p>{`Apertura ${sucursalEjemplo.horarioApertura} - ${sucursalEjemplo.horarioCierra}`}</p>
        <img src={sucursalEjemplo.imagen} alt="" />

        {showCard && (
          <div>
            <button className="location">
              <span className="material-symbols-outlined">location_city</span>
            </button>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
