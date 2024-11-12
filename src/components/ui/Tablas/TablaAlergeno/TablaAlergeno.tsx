import { FC, useState } from "react";
import { ICreateAlergeno } from "../../../../types/dtos/alergenos/ICreateAlergeno.ts";
import "./TablaAlergeno.css";
import { CrearAlergeno } from "../../forms/Alergeno/CrearAlergeno/CrearAlergeno";
import { ModificarAlergeno } from "../../forms/Alergeno/ModificarAlergeno/ModificarAlergeno.tsx";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos.ts";
import { VerAlergeno } from "../../forms/Alergeno/VerAlergeno/VerAlergeno.tsx";
import { EliminarAlergeno } from "../../forms/Alergeno/EliminarAlergeno/EliminarAlergeno.tsx";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa.ts";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal.ts";

interface ITablaAlergeno {
  empresa?: IEmpresa;
  sucursal?: ISucursal;
}

export const TablaAlergeno: FC<ITablaAlergeno> = ({ empresa, sucursal }) => {
  const [crearAlergeno, setCrearAlergeno] = useState<boolean>(false);
  const [modificarAlergeno, setModificarAlergeno] = useState<boolean>(false);
  const [eliminarAlergeno, setEliminarAlergeno] = useState<boolean>(false);
  const [verAlergeno, setVerAlergeno] = useState<boolean>(false);

  const [alergenoSeleccionado, setAlergenoSeleccionado] =
    useState<IAlergenos | null>(null);

  const initialForm: ICreateAlergeno = {
    denominacion: "",
    imagen: {
      name: "",
      url: "",
    },
  };

  const handleCrearAlergeno = () => {
    setCrearAlergeno(!crearAlergeno);
  };

  const handleModificarAlergeno = (alergeno: IAlergenos) => {
    setAlergenoSeleccionado(alergeno);
    setModificarAlergeno(!modificarAlergeno);
  };

  const handleVerAlergeno = (alergeno: IAlergenos) => {
    setAlergenoSeleccionado(alergeno);
    setVerAlergeno(!verAlergeno);
  };

  const handleEliminarAlergeno = (alergeno: IAlergenos) => {
    setAlergenoSeleccionado(alergeno);
    setEliminarAlergeno(!eliminarAlergeno);
  };

  return (
    <>
      <div className="tableAlergeno">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresa &&
              empresa.alergenos?.map((alergenos) => (
                <tr key={alergenos.id}>
                  <td>{alergenos.denominacion}</td>
                  <td>
                    <div
                      className="buttonsAlergeno"
                      key={`buttons-${alergenos.id}`}
                    >
                      <button className="visibility">
                        <span
                          className="material-symbols-outlined"
                          onClick={() => handleVerAlergeno(alergenos)}
                        >
                          visibility
                        </span>
                      </button>
                      <button
                        className="edit"
                        onClick={() => handleModificarAlergeno(alergenos)}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleEliminarAlergeno(alergenos)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            <tr className="agregarAlergeno">
              <td colSpan={2}>
                <button onClick={handleCrearAlergeno}>AGREGAR ALERGENO</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {crearAlergeno && (
        <CrearAlergeno
          initialForm={initialForm}
          handleCrearAlergeno={handleCrearAlergeno}
        />
      )}

      {modificarAlergeno && alergenoSeleccionado && (
        <ModificarAlergeno
          handleModificarAlergeno={() => setModificarAlergeno(false)}
          alergeno={alergenoSeleccionado}
        />
      )}

      {verAlergeno && alergenoSeleccionado && (
        <VerAlergeno
          alergeno={alergenoSeleccionado}
          handleVerAlergeno={() => setVerAlergeno(false)}
        />
      )}

      {eliminarAlergeno && alergenoSeleccionado && (
        <EliminarAlergeno
          alergeno={alergenoSeleccionado}
          handleEliminarAlergeno={() => setEliminarAlergeno(false)}
        />
      )}
    </>
  );
};
