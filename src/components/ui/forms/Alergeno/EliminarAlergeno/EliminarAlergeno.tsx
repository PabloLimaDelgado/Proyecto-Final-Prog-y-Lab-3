import { FC, FormEvent } from "react";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos.ts";
import "./EliminarAlergeno.css";
import { useDispatch } from "react-redux";
import { setEliminarAlergeno } from "../../../../../redux/slices/EmpresaReducer.ts";

interface IEliminarAlergeno {
  alergeno: IAlergenos;
  handleEliminarAlergeno: () => void;
}

export const EliminarAlergeno: FC<IEliminarAlergeno> = ({
  alergeno,
  handleEliminarAlergeno,
}) => {
  const dispatch = useDispatch();

  const handleEliminarAlergenoAcept = async (
    event: FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        `http://190.221.207.224:8090/alergenos/${alergeno.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: IAlergenos = alergeno;

      dispatch(
        setEliminarAlergeno({
          alergeno: data,
        })
      );
    } catch (error) {
      console.error("Error: ", error);
    }

    handleEliminarAlergeno();
  };
  return (
    <>
      <div className="eliminarAlergenoContainer">
        <div className="eliminarAlergeno">
          <h1>Eliminar Alergeno</h1>
          <div className="buttons">
            <button onClick={handleEliminarAlergeno} className="buttonRojo">
              CERRAR
            </button>
            <button
              className="buttonVerde"
              onClick={handleEliminarAlergenoAcept}
            >
              ACEPAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
