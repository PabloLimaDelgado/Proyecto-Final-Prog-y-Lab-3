import { CardSucursal } from "../CardSucursal/CardSucursal.tsx";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import { FC, useState } from "react";
import { useAppSelector } from "../../../hooks/redux.ts";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal";
import { CrearSucursal } from "../forms/Sucursal/CrearSucursal/CrearSucursal.tsx";

import "./PageSucursal.css"

interface ISucursalList {
  empresa: IEmpresa;
}

export const PageSucursal: FC<ISucursalList> = ({ empresa }) => {
  const [crearSucursal, setCrearSucursal] = useState<boolean>(false);

  const empresaSeleccionada = useAppSelector((state) =>
    state.empresaReducer.empresa.find((e) => e.id === empresa.id)
  );

  const initialForm: ICreateSucursal = {
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    esCasaMatriz: false,
    latitud: 0,
    longitud: 0,
    domicilio: {
      calle: "",
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
      idLocalidad: 0,
    },
    idEmpresa: empresa.id,
    logo: "",
  };

  const handleCrearSucursal = () => {
    setCrearSucursal(!crearSucursal);
  };

  return (
    <div className="cardSucursalSide">
      <div
        className="d-flex w-100 justify-content-around align-items-center "
        style={{ width: "100%" }}
      ></div>
      <div className="cartaSucursalContainer">
        {empresaSeleccionada?.sucursales &&
          empresaSeleccionada.sucursales.map((sucursal) => (
            <CardSucursal
              key={sucursal.id}
              sucursal={sucursal}
              empresa={empresa}
            />
          ))}
        <div className="cardSucursalButton">
          <button onClick={handleCrearSucursal}>
            <h2>Agregar sucursal</h2>
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>

      {crearSucursal && (
        <CrearSucursal
          handleCrearSucursal={handleCrearSucursal}
          initialForm={initialForm}
          empresa={empresa}
        />
      )}
    </div>
  );
};
