import { FormEvent } from "react";
import { useForm } from "../../../../hooks/useForm.ts";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto.ts";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa.ts";

import "./ModificarEmpresa.css";
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { setModificarEmpresa } from "../../../../redux/slices/EmpresaReducer.ts";

interface IModificarEmpresa {
  handleModificarEmpresa: () => void;
  initialForm: IEmpresa;
}

export const ModificarEmpresa = ({
  handleModificarEmpresa,
  initialForm,
}: IModificarEmpresa) => {
  const { onInputChange, formState } = useForm<ICreateEmpresaDto>(initialForm);
  const dispatch = useAppDispatch();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        `http://190.221.207.224:8090/empresas/${initialForm.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      const data: IEmpresa = await response.json();
      dispatch(setModificarEmpresa(data));
      handleModificarEmpresa();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modalEmpresa">
      <form onSubmit={onSubmit}>
        <h1>Modificar Empresa</h1>
        <input
          type="text"
          placeholder="Ingrese un nombre"
          name="nombre"
          onChange={onInputChange}
          value={formState.nombre}
        />
        <input
          type="text"
          placeholder="Ingrese una razón social"
          name="razonSocial"
          onChange={onInputChange}
          value={formState.razonSocial}
        />
        <input
          type="number"
          placeholder="Ingrese un cuit"
          name="cuit"
          onChange={onInputChange}
          value={formState.cuit}
        />
        <input
          type="text"
          placeholder="Ingrese una imagen"
          name="logo"
          onChange={onInputChange}
          value={formState.logo ? formState.logo : ""}
        />

        <div className="buttons">
          <button
            type="reset"
            className="buttonRojo"
            onClick={handleModificarEmpresa}
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
