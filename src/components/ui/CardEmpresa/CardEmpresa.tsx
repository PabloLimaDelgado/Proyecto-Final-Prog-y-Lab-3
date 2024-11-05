import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import { FC, useState } from "react";
import "./CardEmpresa.css";
import { VerEmpresa } from "../forms/Empresa/VerEmpresa/VerEmpresa.tsx";
import { ModificarEmpresa } from "../forms/Empresa/ModificarEmpresa/ModificarEmpresa.tsx";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { setEmpresaEnviada } from "../../../redux/slices/EmpresaReducer.ts";
interface ICardEmpresa {
  empresa: IEmpresa;
}

export const CardEmpresa: FC<ICardEmpresa> = ({ empresa }) => {
  const [empresaView, setEmpresaView] = useState<boolean>(false);
  const [modificarEmpresa, setModificarEmpresa] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleEmpresaView = () => {
    setEmpresaView(!empresaView);
  };

  const handleModificarEmpresa = () => {
    setModificarEmpresa(!modificarEmpresa);
  };

  // const navigate = useNavigate();

  // const handleNavigate = () => {
  //   navigate("/vistaEmpresa");
  // };

  return (
    <>
      <div className="cartaSucursal">
        <h1>{`${empresa?.nombre}`}</h1>
        <img src={empresa.logo ? empresa.logo : ""} alt="" />
        <div className="buttonsSucursales">
          <button
            className="location"
            onClick={() => {
              dispatch(setEmpresaEnviada({ empresa }));
            }}
          >
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
