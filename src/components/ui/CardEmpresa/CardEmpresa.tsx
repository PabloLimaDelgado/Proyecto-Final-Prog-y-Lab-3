import { useNavigate } from "react-router-dom";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal.ts";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import { FC, useState } from "react";
import { IUpdateSucursal } from "../../../types/dtos/sucursal/IUpdateSucursal.ts";
import "./CardEmpresa.css";
import { VerSucursal } from "../forms/VerSucursal/VerSucursal.tsx";
import { ModificarSucursal } from "../forms/ModificarSucursal/ModificarSucursal.tsx";
import { useAppSelector } from "../../../hooks/redux.ts";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto.ts";
import { VerEmpresa } from "../forms/VerEmpresa/VerEmpresa.tsx";
import { ModificarEmpresa } from "../forms/ModificarEmpresa/ModificarEmpresa.tsx";
interface ICardEmpresa{
  empresa: IEmpresa;
}

export const CardEmpresa: FC<ICardEmpresa> = ({ empresa }) => {
  const [empresaView, setEmpresaView] = useState<boolean>(false);
  const [modificarEmpresa, setModificarEmpresa] = useState<boolean>(false);

  const handleEmpresaView = () => {
    setEmpresaView(!empresaView);
  };

  const handleModificarEmpresa = () => {
    setModificarEmpresa(!modificarEmpresa);
  };


  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("");
  };


  return (
    <>
      <div className="cartaSucursal">
        <h1>{`${empresa?.nombre}`}</h1>
        <img src={empresa.logo} alt="" />
        <div className="buttonsSucursales">
          <button className="location" onClick={handleNavigate}>
            <span className="material-symbols-outlined">location_city</span>
          </button>
          <button className="edit" onClick={handleModificarEmpresa}>
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="visibility" onClick={handleEmpresaView}>
            <span className="material-symbols-outlined">visibility</span>
          </button>
        </div>
      </div>

      {empresaView && (
        <VerEmpresa
          empresa={empresa ? empresa : empresa}
          handleEmpresaVIew={handleEmpresaView}
        />
      )}
      {modificarEmpresa && (
        <ModificarEmpresa
          handleModificarEmpresa={handleModificarEmpresa}
          initialForm={empresa ? empresa : empresa}
        />
      )}
    </>
  );
};
