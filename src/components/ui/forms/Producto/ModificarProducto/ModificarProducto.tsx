import React, { FC, FormEvent, useEffect, useState } from "react";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal";
import { IProductos } from "../../../../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../../../../types/dtos/productos/IUpdateProducto";
import { useForm } from "../../../../../hooks/useForm";
import { ICreateProducto } from "../../../../../types/dtos/productos/ICreateProducto";
import { ICategorias } from "../../../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../../types/dtos/alergenos/IAlergenos";
import { useDispatch } from "react-redux";
import { setModificarProducto } from "../../../../../redux/slices/EmpresaReducer";

import "../Producto.css";

interface IModificarProducto {
  sucursal?: ISucursal;
  producto: IProductos;
  handleModificarProducto: () => void;
}

export const ModificarProducto: FC<IModificarProducto> = ({
  producto,
  sucursal,
  handleModificarProducto,
}) => {
  const [selectedAlergenos, setSelectedAlergenos] = useState<number[]>([]);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [showAlergenos, setShowAlergenos] = useState(false);
  const dispatch = useDispatch();

  const initialForm: IUpdateProducto = {
    id: producto.id,
    denominacion: producto.denominacion,
    precioVenta: producto.precioVenta,
    descripcion: producto.descripcion,
    habilitado: producto.habilitado,
    imagenes: producto.imagenes,
    codigo: producto.codigo,
    idCategoria: producto.categoria.id,
    idAlergenos: producto.alergenos.map((alergeno) => alergeno.id), // Cambiar forEach por map
  };

  const { onInputChange, formState, setFormState } =
    useForm<ICreateProducto>(initialForm);

  useEffect(() => {
    if (sucursal?.id) {
      fetch(
        `http://190.221.207.224:8090/categorias/allSubCategoriasPorSucursal/${sucursal.id}`
      )
        .then((response: Response) => response.json())
        .then((data: ICategorias[]) => setCategorias(data))
        .catch((error) => console.error("Error fetching categorias:", error));

      fetch("http://190.221.207.224:8090/alergenos")
        .then((response: Response) => response.json())
        .then((data: IAlergenos[]) => setAlergenos(data))
        .catch((error) => console.error("Error fetching alergenos:", error));
    }
  }, [sucursal?.id]);

  const handleAlergenosChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const alergenoId = parseInt(value);
    setSelectedAlergenos((prev) =>
      checked ? [...prev, alergenoId] : prev.filter((id) => id !== alergenoId)
    );
    setFormState({
      ...formState,
      idAlergenos: checked
        ? [...formState.idAlergenos, alergenoId]
        : formState.idAlergenos.filter((id) => id !== alergenoId),
    });
  };

  const handleCategoriaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      idCategoria: parseInt(event.target.value),
    });
  };

  const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setFormState({
      ...formState,
      imagenes: [{ name: formState.denominacion, url: url }], // Reemplaza con el valor adecuado de `name`
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const producto: IUpdateProducto = {
        id: initialForm.id,
        denominacion: formState.denominacion,
        precioVenta: formState.precioVenta,
        descripcion: formState.descripcion,
        habilitado: formState.habilitado,
        imagenes: formState.imagenes,
        codigo: formState.codigo,
        idCategoria: formState.idCategoria,
        idAlergenos: formState.idAlergenos,
      };

      const response: Response = await fetch(
        `http://190.221.207.224:8090/articulos/update/${initialForm.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto), // Solo envía formState
        }
      );

      const data: IProductos = await response.json();

      if (sucursal?.id) {
        dispatch(
          setModificarProducto({
            producto: data,
            sucursalId: sucursal.id,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }

    handleModificarProducto();
  };

  return (
    <div className="modalProducto">
      <form onSubmit={onSubmit}>
        <h1>Modificar Producto</h1>
        <div>
          <div className="grids">
            <div>
              <input
                type="text"
                placeholder="Ingrese una denominacion"
                name="denominacion"
                value={formState.denominacion}
                onChange={onInputChange}
              />

              <select
                name="categoria"
                id="categoria"
                onChange={handleCategoriaChange}
                value={formState.idCategoria}
              >
                <option value="">Seleccione una categoria</option>
                {categorias &&
                  categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.denominacion}
                    </option>
                  ))}
              </select>

              <div className="pAlergenosContainer">
                <p className="pAlergenos">Seleccione los alergenos</p>
                <span
                  className="material-symbols-outlined"
                  onClick={() => setShowAlergenos((prev) => !prev)}
                >
                  add
                </span>
              </div>

              <input
                type="number"
                placeholder="Ingrese un precio de venta"
                name="precioVenta"
                value={formState.precioVenta ? formState.precioVenta : ""}
                onChange={onInputChange}
              />
              <input
                type="text"
                placeholder="Ingrese un codigo"
                name="codigo"
                value={formState.codigo}
                onChange={onInputChange}
              />

              <div className="divHabilitado">
                <input
                  type="checkbox"
                  id="habilitado"
                  name="habilitado"
                  onChange={(e) =>
                    onInputChange({
                      target: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    } as any)
                  }
                  checked={formState.habilitado}
                />
                <label htmlFor="habilitado">
                  <span className="material-symbols-outlined">check</span>
                </label>
                <p>Habilitado</p>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Ingrese una descripcion"
                onChange={onInputChange}
                value={formState.descripcion}
                name="descripcion"
              />
              <input
                type="text"
                placeholder="Ingrese una imagen"
                onChange={handleImagenChange}
                value={formState.imagenes[0]?.url || ""}
              />
            </div>
          </div>
        </div>
        <div className="divButtonsSucursal">
          <button
            type="button"
            onClick={handleModificarProducto}
            className="buttonRojoSucursalCrear"
          >
            CANCELAR
          </button>
          <button type="submit" className="buttonVerdeSucursalCrear">
            ACEPTAR
          </button>
        </div>

        {showAlergenos && (
          <div className="divAlergenos">
            {alergenos.map((alergeno) => (
              <div key={alergeno.id} className="divInputs">
                <input
                  type="checkbox"
                  value={alergeno.id}
                  className="inputAlergeno"
                  onChange={handleAlergenosChange}
                  checked={formState.idAlergenos.includes(alergeno.id)}
                />
                <p>{alergeno.denominacion}</p>
              </div>
            ))}

            <button
              className="buttonCerrarAlergenos"
              onClick={() => setShowAlergenos((prev) => !prev)}
            >
              Cerrar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
