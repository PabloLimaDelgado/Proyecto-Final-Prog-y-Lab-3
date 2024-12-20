// import { CardSucursal } from "../CardSucursal/CardSucursal.tsx";
import "./PageEmpresa.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import { FC, useState } from "react";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto.ts";
import { CrearEmpresa } from "../forms/Empresa/CrearEmpresa/CrearEmpresa.tsx";
import { CardEmpresa } from "../CardEmpresa/CardEmpresa.tsx";
// import { useAppSelector } from "../../../hooks/redux.ts";
// import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal.ts";
// import { CrearSucursal } from "../forms/CrearSucursal/CrearSucursal.tsx";

interface ISucursalList {
  empresas: IEmpresa[];
}

export const PageEmpresa: FC<ISucursalList> = ({ empresas }) => {
  const [crearEmpresa, setCrearEmpresa] = useState<boolean>(false);
  const handleCrearEmpresa = () => {
    setCrearEmpresa(!crearEmpresa);
  };
  const initialForm: ICreateEmpresaDto = {
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: "",
  };



  return (
    <div className="cardSucursalSide">
      <div
        className="d-flex w-100 justify-content-around align-items-center "
        style={{ width: "100%" }}
      ></div>
      <div className="cartaSucursalContainer">
        {empresas.map((empresa) => (
          <CardEmpresa key={empresa.id} empresa={empresa} />
        ))}
      </div>

      {crearEmpresa && (
        <CrearEmpresa
          handleCrearEmpresa={handleCrearEmpresa}
          initialForm={initialForm}
        />
      )}
    </div>
  );
};
