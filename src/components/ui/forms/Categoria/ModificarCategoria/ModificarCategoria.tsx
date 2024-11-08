import { ChangeEvent, FC } from "react";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal.ts";
import { ICategorias } from "../../../../../types/dtos/categorias/ICategorias.ts";
import { IUpdateCategoria } from "../../../../../types/dtos/categorias/IUpdateCategoria.ts";
import { useForm } from "../../../../../hooks/useForm.ts";
import { useDispatch } from "react-redux";
import { setModificarCategoria } from "../../../../../redux/slices/EmpresaReducer.ts";

import "../Categoria.css";

interface IModificarCategoria {
  sucursal: ISucursal;
  categoria: ICategorias;
  handleModificarCategoriaPadre: () => void;
}
export const ModificarCategoria: FC<IModificarCategoria> = ({
  sucursal,
  handleModificarCategoriaPadre,
  categoria,
}) => {
  const initialForm: IUpdateCategoria = {
    id: categoria.id,
    denominacion: categoria.denominacion,
    eliminado: categoria.eliminado,
    idEmpresa: sucursal.empresa.id,
    idSucursales: categoria.sucursales.map((sucursal) => sucursal.id),
    idCategoriaPadre: null,
  };

  const { formState, onInputChange } = useForm<IUpdateCategoria>(initialForm);
  const dispatch = useDispatch();

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        `http://190.221.207.224:8090/categorias/update/${categoria.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      const data: ICategorias = await response.json();

      dispatch(
        setModificarCategoria({
          categoria: data,
          sucursalId: sucursal.id,
        })
      );
    } catch (error) {
      console.error(error);
    }
    handleModificarCategoriaPadre();
  };

  return (
    <div className="modalCategoria">
      <form onSubmit={onSubmit}>
        <h1>Modificar Categoria</h1>
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
            onClick={handleModificarCategoriaPadre}
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
