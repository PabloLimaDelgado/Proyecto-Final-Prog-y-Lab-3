import { useNavigate } from "react-router-dom";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal.ts";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import { FC, useState } from "react";
import { IUpdateSucursal } from "../../../types/dtos/sucursal/IUpdateSucursal.ts";
import "./CardSucursal.css";
import { VerSucursal } from "../forms/VerSucursal/VerSucursal.tsx";
import { ModificarSucursal } from "../forms/ModificarSucursal/ModificarSucursal.tsx";
import { useAppSelector } from "../../../hooks/redux.ts";
interface ICardSucursal {
  sucursal: ISucursal;
  empresa: IEmpresa;
}

export const CardSucursal: FC<ICardSucursal> = ({ sucursal, empresa }) => {
  const [sucursalView, setSucursalView] = useState<boolean>(false);
  const [modificarSucursal, setModificarSucursal] = useState<boolean>(false);

  const handleSucursalView = () => {
    setSucursalView(!sucursalView);
  };

  const handleSucursalModificar = () => {
    setModificarSucursal(!modificarSucursal);
  };

  const initialForm: IUpdateSucursal = {
    id: sucursal.id,
    nombre: sucursal.nombre,
    idEmpresa: empresa.id,
    eliminado: false,
    latitud: sucursal.latitud,
    longitud: sucursal.longitud,
    domicilio: {
      id: sucursal.domicilio.id,
      calle: sucursal.domicilio.calle,
      numero: sucursal.domicilio.numero,
      cp: sucursal.domicilio.cp,
      piso: sucursal.domicilio.piso,
      nroDpto: sucursal.domicilio.nroDpto,
      idLocalidad: sucursal.domicilio.localidad.id,
    },
    logo: sucursal.logo ? sucursal.logo : "",
    categorias: sucursal.categorias || [],
    esCasaMatriz: sucursal.esCasaMatriz,
    horarioApertura: sucursal.horarioApertura,
    horarioCierre: sucursal.horarioCierre,
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/vistaMenu");
  };

  const empresaSeleccionada = useAppSelector((state) =>
    state.empresaReducer.empresa.find((e) => e.id === empresa.id)
  );

  return (
    <>
      <div className="cartaSucursal">
        <h1>{`${empresaSeleccionada?.nombre} - ${sucursal.nombre}`}</h1>
        <p>{`Apertura ${sucursal.horarioApertura} - ${sucursal.horarioCierre}`}</p>
        <img src={sucursal.logo} alt="" />
        <div className="buttonsSucursales">
          <button className="location" onClick={handleNavigate}>
            <span className="material-symbols-outlined">location_city</span>
          </button>
          <button className="edit" onClick={handleSucursalModificar}>
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="visibility" onClick={handleSucursalView}>
            <span className="material-symbols-outlined">visibility</span>
          </button>
        </div>
      </div>

      {sucursalView && (
        <VerSucursal
          empresa={empresa}
          sucursal={sucursal}
          handleSucursalView={handleSucursalView}
        ></VerSucursal>
      )}

      {modificarSucursal && (
        <ModificarSucursal
          initialForm={initialForm}
          handleSucursalModificar={handleSucursalModificar}
          sucursal={sucursal}
        />
      )}
    </>
  );
};
