import { useShow } from "../../../hooks/useShow.ts";
import "./MenuOpciones.css";

export const MenuOpciones = () => {
  const { selectedButton, handleClickButton } = useShow();

  return (
    <div
      className={
        selectedButton === "Categorias"
          ? "Categorias menuContainer "
          : selectedButton === "Productos"
          ? "Productos menuContainer"
          : selectedButton === "Alergenos"
          ? "Alergenos menuContainer"
          : "menuContainer"
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
  );
};
