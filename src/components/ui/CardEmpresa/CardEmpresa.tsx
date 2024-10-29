import { FC, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import "./CardEmpresa.css";
import { VerEmpresa } from "../forms/VerEmpresa/VerEmpresa.tsx";
import { ModificarEmpresa } from "../forms/ModificarEmpresa/ModificarEmpresa.tsx";
import { useAppSelector } from "../../../hooks/redux.ts";

interface ICardEmpresa {
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

  const empresaSeleccionada = useAppSelector((state) =>
    state.empresaReducer.empresa.find((e) => e.id === empresa.id)
  );

  return (
    <>
      <div
        className="cardEmpresa"
        style={{
          background: ` linear-gradient(
          rgba(125, 140, 147, 0.9),
          rgba(125, 140, 147, 0.9)
          ),url(${empresaSeleccionada?.logo})`,
        }}
      >
        <div className="cardEmpresaTituloImg">
          <h2>Sucursales en: {empresaSeleccionada?.nombre}</h2>
        </div>
        <div className="buttonsEmpresa">
          <button className="edit">
            <span
              className="material-symbols-outlined"
              onClick={handleModificarEmpresa}
            >
              edit
            </span>
          </button>
          <button className="visibility">
            <span
              className="material-symbols-outlined"
              onClick={handleEmpresaView}
            >
              visibility
            </span>
          </button>
        </div>
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
