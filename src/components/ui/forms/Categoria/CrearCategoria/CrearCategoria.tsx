import { ChangeEvent, FC } from "react";
import { useForm } from "../../../../../hooks/useForm";
import { ICreateCategoria } from "../../../../../types/dtos/categorias/ICreateCategoria";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal";
import { ICategorias } from "../../../../../types/dtos/categorias/ICategorias";
import { useDispatch } from "react-redux";
import { setAgregarCategoria } from "../../../../../redux/slices/EmpresaReducer";

import "../Categoria.css";

interface ICrearCategoria {
  sucursal: ISucursal;
  handleCrearCategoriasPadre: () => void;
}

export const CrearCategoria: FC<ICrearCategoria> = ({
  sucursal,
  handleCrearCategoriasPadre,
}) => {
  const initialForm: ICreateCategoria = {
    denominacion: "",
    idEmpresa: sucursal.empresa.id,
    idCategoriaPadre: null,
  };

  const { onInputChange, formState } = useForm<ICreateCategoria>(initialForm);
  const dispatch = useDispatch();

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        "http://190.221.207.224:8090/categorias/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      const data: ICategorias = await response.json();

      console.log(data);
      dispatch(
        setAgregarCategoria({
          categoria: data,
          sucursalId: sucursal.id,
        })
      );
    } catch (error) {
      console.error(error);
    }

    handleCrearCategoriasPadre();
  };
  return (
    <div className="modalCategoria">
      <form onSubmit={onSubmit}>
        <h1>Crear Categoria</h1>
        <input
          type="text"
          placeholder="Ingrese una denominacion"
          value={formState.denominacion}
          name="denominacion"
          onChange={onInputChange}
        />
        <div className="buttons">
          <button
            type="reset"
            className="buttonRojo"
            onClick={handleCrearCategoriasPadre}
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
