import { FC, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import "./HeaderdEmpresa.css";
import { VerEmpresa } from "../forms/VerEmpresa/VerEmpresa.tsx";
import { ModificarEmpresa } from "../forms/ModificarEmpresa/ModificarEmpresa.tsx";
import { useAppSelector } from "../../../hooks/redux.ts";

interface ICardEmpresa {
  empresa: IEmpresa;
}

export const HeaderdEmpresa: FC<ICardEmpresa> = ({ empresa=null }) => {
  const [empresaView, setEmpresaView] = useState<boolean>(false);
  const [modificarEmpresa, setModificarEmpresa] = useState<boolean>(false);

  const handleEmpresaView = () => {
    setEmpresaView(!empresaView);
  };

  const handleModificarEmpresa = () => {
    setModificarEmpresa(!modificarEmpresa);
  };

  const empresaSeleccionada = useAppSelector((state) =>
    state.empresaReducer.empresa.find((e) => e.id === empresa?.id)
  );

  return (
    <>
      <div
        className="cardEmpresa"
      >
      {empresa != null ? (
        <div className="cardEmpresaTitulo">
          {/* Contenedor para el título y la imagen de la empresa */}
          <div className="title d-flex align-items-center justify-content-center gap-5 pr-3">
            <div className="img">
              {/* Imagen del logo de la empresa seleccionada */}
              <img src={empresaSeleccionada?.logo} alt="Logo de la Empresa" />
            </div>
            {/* Nombre de la empresa en mayúsculas */}
            <h2>{(empresaSeleccionada?.nombre)?.toUpperCase()}</h2>
          </div>

          {/* Contenedor para los botones de edición y visibilidad */}
          <div className="buttonsEmpresa">
            <button className="edit" onClick={handleModificarEmpresa}>
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility" onClick={handleEmpresaView}>
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>
      ) : (
        <h2 style={{color:'white'}}>Listado Empresas</h2>
)}

      </div>
      {empresaView && (
        <VerEmpresa
          empresa={empresaSeleccionada ? empresaSeleccionada : empresa}
          handleEmpresaVIew={handleEmpresaView}
        />
      )}
      {modificarEmpresa && (
        <ModificarEmpresa
          handleModificarEmpresa={handleModificarEmpresa}
          initialForm={empresaSeleccionada ? empresaSeleccionada : empresa}
        />
      )}
    </>
  );
};
