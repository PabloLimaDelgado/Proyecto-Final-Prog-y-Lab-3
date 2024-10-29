import { FormEvent, useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm.ts";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto.ts";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa.ts";
import { IPais } from "../../../../types/IPais.ts";
import "./CrearEmpresa.css";
import { useAppDispatch } from "../../../../hooks/redux.ts";
import { setCrearEmpresa } from "../../../../redux/slices/EmpresaReducer.ts";

interface ICrearEmpresa {
  handleCrearEmpresa: () => void;
  initialForm: ICreateEmpresaDto;
}

export const CrearEmpresa = ({
  handleCrearEmpresa,
  initialForm,
}: ICrearEmpresa) => {
  const { onInputChange, formState } = useForm<ICreateEmpresaDto>(initialForm);
  const dispatch = useAppDispatch();

  const [pais, setPais] = useState<IPais[]>([]);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response: Response = await fetch(
          "http://190.221.207.224:8090/paises"
        );
        const data: IPais[] = await response.json();
        setPais(data);
      } catch (error) {
        console.log(error);
        setPais([]);
      }
    };

    fetchPaises();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        "http://190.221.207.224:8090/empresas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      const data: IEmpresa = await response.json();

      const newEmpresa: IEmpresa = {
        ...data,
        sucursales: [],
      };
      dispatch(setCrearEmpresa(newEmpresa));
      handleCrearEmpresa();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modalEmpresa">
      <form onSubmit={onSubmit}>
        <h1>Crear Empresa</h1>
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
          value={formState.cuit ? formState.cuit : ""}
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
            onClick={handleCrearEmpresa}
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
