import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ICreateAlergeno } from "../../../../../types/dtos/alergenos/ICreateAlergeno.ts";
import { useDispatch } from "react-redux";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos.ts";
import { setAgregarAlergenos } from "../../../../../redux/slices/EmpresaReducer.ts";

import "../Alergeno.css"

interface ICrearAlergeno {
  handleCrearAlergeno: () => void;
  initialForm: ICreateAlergeno;
}

export const CrearAlergeno: FC<ICrearAlergeno> = ({
  initialForm,
  handleCrearAlergeno,
}) => {
  const [form, setForm] = useState<ICreateAlergeno>(initialForm);

  const dispatch = useDispatch();

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

  const alergeno: ICreateAlergeno = {
    denominacion: form.denominacion,
    imagen: {
      name: form.denominacion,
      url: String(form.imagen.url),
    },
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        "http://190.221.207.224:8090/alergenos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alergeno),
        }
      );

      const data: IAlergenos = await response.json();

      dispatch(
        setAgregarAlergenos({
          alergeno: data,
        })
      );
    } catch (error) {
      console.error("Error: ", error);
    }
    handleCrearAlergeno();
  };

  return (
    <div className="modalAlergeno">
      <form onSubmit={onSubmit}>
        <h1>Crear Alergeno</h1>
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
          value={form.imagen.url}
          onChange={onInputChange}
        />

        <div className="buttons">
          <button
            type="reset"
            className="buttonRojo"
            onClick={handleCrearAlergeno}
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
