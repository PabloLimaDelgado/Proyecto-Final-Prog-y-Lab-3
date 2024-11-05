import { FC } from "react";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal.ts";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa.ts";
import "./VerSucursal.css";

interface IVerSucursal {
  sucursal: ISucursal;
  empresa: IEmpresa;
  handleSucursalView: () => void;
}

export const VerSucursal: FC<IVerSucursal> = ({
  sucursal,
  empresa,
  handleSucursalView,
}) => {
  return (
    <>
      <div className="verSucursalContainer">
        <div className="verSucursal">
          <h1>Sucursal</h1>
          <div>
            <p>
              <span>Nombre: </span>
              {sucursal.nombre}
            </p>
            <p>
              <span>Empresa: </span>
              {empresa.nombre}
            </p>
            <p>
              <span>Domicilio: </span>
              {sucursal.domicilio.localidad.nombre},{" "}
              {sucursal.domicilio.localidad.provincia.nombre},{" "}
              {sucursal.domicilio.calle}, {sucursal.domicilio.numero}
            </p>

            <p>
              <span>¿Casa matriz? </span>
              {sucursal.esCasaMatriz === true ? "Si" : "No"}
            </p>
            <p>
              <span>Horario apertura: </span>
              {sucursal.horarioApertura}h
            </p>
            <p>
              <span>Horario cierre: </span>
              {sucursal.horarioCierre}h
            </p>
            <div className="divImagenSucursal">
              <span>Logo: </span>
              <img src={sucursal.logo ? sucursal.logo : ""} alt="" />
            </div>
          </div>

          <button className="buttonVerdeSucursal" onClick={handleSucursalView}>
            CERRAR
          </button>
        </div>
      </div>
    </>
  );
};
