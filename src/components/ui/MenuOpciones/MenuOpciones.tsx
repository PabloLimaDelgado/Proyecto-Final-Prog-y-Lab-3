import { FC } from "react";
import { useShow } from "../../../hooks/useShow.ts";
import { TablaAlergeno } from "../Tablas/TablaAlergeno/TablaAlergeno.tsx";
import "./MenuOpciones.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal.ts";
import { TablaProducto } from "../Tablas/TablaProducto/TablaProducto.tsx";
import { TablaCategorias } from "../Tablas/TablaCategorias/TablaCategorias.tsx";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";

interface IMenuOpciones {
  sucursal?: ISucursal;
  empresa?: IEmpresa;
}

export const MenuOpciones: FC<IMenuOpciones> = ({ sucursal, empresa }) => {
  const { selectedButton, handleClickButton } = useShow();

  return (
    <>
      <div
        className={
          selectedButton === "Categorias"
            ? "Categorias menuContainer "
            : selectedButton === "Productos"
            ? "Productos menuContainer"
            : selectedButton === "Alergenos"
            ? "Alergenos menuContainer"
            : "Categorias menuContainer"
        }
      >
        <ul>
          <li>
            <button
              onClick={() => handleClickButton("Categorias")}
              className={
                selectedButton === "Categorias" ? "buttonSeleccionado" : ""
              }
            >
              Categorias
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClickButton("Productos")}
              className={
                selectedButton === "Productos" ? "buttonSeleccionado" : ""
              }
            >
              Productos
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClickButton("Alergenos")}
              className={
                selectedButton === "Alergenos" ? "buttonSeleccionado" : ""
              }
            >
              Alergenos
            </button>
          </li>
        </ul>
      </div>

      {selectedButton === "Alergenos" ? (
        <TablaAlergeno empresa={empresa} sucursal={sucursal} />
      ) : selectedButton === "Productos" ? (
        sucursal && <TablaProducto sucursal={sucursal} />
      ) : selectedButton == "Categorias" ? (
        <TablaCategorias sucursal={sucursal} />
      ) : (
        <TablaCategorias sucursal={sucursal} />
      )}
    </>
  );
};
