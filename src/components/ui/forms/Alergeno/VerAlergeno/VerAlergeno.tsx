import { FC } from "react";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos.ts";
import "./VerAlergeno.css";
interface IVerAlergeno {
  alergeno: IAlergenos;
  handleVerAlergeno: () => void;
}

export const VerAlergeno: FC<IVerAlergeno> = ({
  alergeno,
  handleVerAlergeno,
}) => {
  return (
    <>
      <div className="verAlergenoContainer">
        <div className="verAlergeno">
          <h1>Alergeno</h1>
          <div>
            <p>
              <span>Nombre: </span>
              {alergeno.denominacion}
            </p>
          </div>
          <div className="divImagenAlergeno">
            <span>Imagen: </span>
            <img src={alergeno.imagen?.url ? alergeno.imagen.url : ""} alt="" />
          </div>
          <button className="buttonVerde" onClick={handleVerAlergeno}>
            CERRAR
          </button>
        </div>
      </div>
    </>
  );
};
