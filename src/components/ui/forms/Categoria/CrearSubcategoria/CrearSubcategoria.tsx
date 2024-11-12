import React, { ChangeEvent, FC } from "react";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal.ts";
import { ICategorias } from "../../../../../types/dtos/categorias/ICategorias.ts";
import { ICreateCategoria } from "../../../../../types/dtos/categorias/ICreateCategoria.ts";
import { useForm } from "../../../../../hooks/useForm.ts";
import { setAgregarCategoria } from "../../../../../redux/slices/EmpresaReducer.ts";
import { useDispatch } from "react-redux";

import "../Categoria.css";


interface ICrearSubcategoria {
  sucursal: ISucursal;
  categoriaPadre: ICategorias;
  handleCrearSubcategoria: () => void;
}

export const CrearSubcategoria: FC<ICrearSubcategoria> = ({
  sucursal,
  categoriaPadre,
  handleCrearSubcategoria,
}) => {
  const initialForm: ICreateCategoria = {
    denominacion: "",
    idEmpresa: sucursal.empresa.id,
    idCategoriaPadre: categoriaPadre.id,
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

    handleCrearSubcategoria();
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
            onClick={handleCrearSubcategoria}
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
