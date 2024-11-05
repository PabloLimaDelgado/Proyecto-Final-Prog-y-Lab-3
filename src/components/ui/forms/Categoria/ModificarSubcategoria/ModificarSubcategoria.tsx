import { ChangeEvent, FC } from "react";
import { ICategorias } from "../../../../../types/dtos/categorias/ICategorias.ts";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal.ts";
import { IUpdateCategoria } from "../../../../../types/dtos/categorias/IUpdateCategoria.ts";
import { useForm } from "../../../../../hooks/useForm.ts";
import { useDispatch } from "react-redux";
import { setModificarCategoria } from "../../../../../redux/slices/EmpresaReducer.ts";

import "../Categoria.css";


interface IModificarSubcategoria {
  sucursal: ISucursal;
  categoriaPadre: ICategorias;
  subcategoriaSeleccionada: ICategorias;
  handleModificarSubcategoria: () => void;
}

export const ModificarSubcategoria: FC<IModificarSubcategoria> = ({
  sucursal,
  categoriaPadre,
  subcategoriaSeleccionada,
  handleModificarSubcategoria,
}) => {
  const initialForm: IUpdateCategoria = {
    id: subcategoriaSeleccionada.id,
    denominacion: subcategoriaSeleccionada.denominacion,
    eliminado: subcategoriaSeleccionada.eliminado,
    idEmpresa: sucursal.empresa.id,
    idSucursales: categoriaPadre.sucursales.map((sucursal) => sucursal.id),
    idCategoriaPadre: categoriaPadre.id,
  };

  const { formState, onInputChange } = useForm<IUpdateCategoria>(initialForm);
  const dispatch = useDispatch();

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        `http://190.221.207.224:8090/categorias/update/${subcategoriaSeleccionada.id}`,
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

    handleModificarSubcategoria();
  };

  return (
    <div className="modalCategoria">
      <form onSubmit={onSubmit}>
        <h1>Crear Subcategoria</h1>
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
            onClick={handleModificarSubcategoria}
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
