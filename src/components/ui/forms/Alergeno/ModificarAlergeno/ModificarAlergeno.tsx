import { ChangeEvent, FC, FormEvent, useState } from "react";
import { IUpdateAlergeno } from "../../../../../types/dtos/alergenos/IUpdateAlergeno.ts";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos.ts";
import { useDispatch } from "react-redux";
import { setModificarAlergenos } from "../../../../../redux/slices/EmpresaReducer.ts";

import "../Alergeno.css"


interface IModificarAlergeno {
  handleModificarAlergeno: () => void;
  alergeno: IAlergenos;
}

export const ModificarAlergeno: FC<IModificarAlergeno> = ({
  alergeno,
  handleModificarAlergeno,
}) => {
  let initialForm: IUpdateAlergeno;
  const dispatch = useDispatch();

  if (alergeno.imagen !== null) {
    initialForm = {
      id: alergeno.id,
      denominacion: alergeno.denominacion,
      imagen: {
        name: alergeno.imagen.name || "",
        url: alergeno.imagen.url || "",
      },
    };
  } else {
    initialForm = {
      ...alergeno,
    };
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "imagen") {
      setForm((prevState) => ({
        ...prevState,
        imagen: {
          ...prevState.imagen,
          url: value,
          name: prevState.denominacion || "",
        },
      }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [form, setForm] = useState<IUpdateAlergeno>(initialForm);

  const alergenoModificado: IUpdateAlergeno = {
    id: alergeno.id,
    denominacion: form.denominacion,
    imagen: {
      name: form.denominacion,
      url: String(form.imagen?.url),
    },
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        `http://190.221.207.224:8090/alergenos/${alergeno.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alergenoModificado),
        }
      );

      const data: IAlergenos = await response.json();

      dispatch(
        setModificarAlergenos({
          alergeno: data,
        })
      );
    } catch (error) {
      console.error("Error: ", error);
    }

    handleModificarAlergeno();
  };

  return (
    <div className="modalAlergeno">
      <form onSubmit={onSubmit}>
        <h1>Modificar Alergeno</h1>
        <input
          type="text"
          placeholder="Ingrese una denominacion"
          name="denominacion"
          value={form.denominacion}
          onChange={onInputChange}
        />

        <input
          type="text"
          placeholder="Ingrese una imagen"
          name="imagen"
          value={form.imagen?.url}
          onChange={onInputChange}
        />

        <div className="buttons">
          <button
            type="reset"
            className="buttonRojo"
            onClick={handleModificarAlergeno}
          >
            CANCELAR
          </button>
          <button type="submit" className="buttonVerde">
            ACEPTAR
          </button>
        </div>
      </form>
    </div>
  );
};
