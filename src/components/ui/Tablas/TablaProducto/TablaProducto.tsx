import { FC, useEffect, useState } from "react";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal.ts";
import { IProductos } from "../../../../types/dtos/productos/IProductos.ts";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto.ts";
import { EliminarProducto } from "../../forms/Producto/EliminarProducto/EliminarProducto.tsx";
import { VerProducto } from "../../forms/Producto/VerProducto/VerProducto.tsx";
import { ModificarProducto } from "../../forms/Producto/ModificarProducto/ModificarProducto.tsx";
import { CrearProducto } from "../../forms/Producto/CrearProducto/CrearProducto.tsx";

import "./TablaProducto.css";
import { useFetch } from "../../../../hooks/useFetch.ts";
interface ITablaProducto {
  sucursal: ISucursal;
}

export const TablaProducto: FC<ITablaProducto> = ({ sucursal }) => {
  const [crearProducto, setCrearProducto] = useState<boolean>(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<IProductos | null>(null);
  const [modificarProducto, setModificarProducto] = useState<boolean>(false);
  const [verProducto, setVerProducto] = useState<boolean>(false);
  const [eliminarProducto, setEliminarProducto] = useState<boolean>(false);
  const [paginaActual, setPaginaActual] = useState<number>(0);

  const handleCrearProducto = () => {
    setCrearProducto(!crearProducto);
  };

  const handleModificarProducto = (producto: IProductos) => {
    setModificarProducto(!modificarProducto);
    setProductoSeleccionado(producto);
  };

  const handleVerProducto = (producto: IProductos) => {
    setVerProducto(!verProducto);
    setProductoSeleccionado(producto);
  };

  const handleEliminarProducto = (producto: IProductos) => {
    setEliminarProducto(!eliminarProducto);
    setProductoSeleccionado(producto);
  };

  const productosPorPagina = 4;

  const totalPaginas = Math.ceil(
    (sucursal.productos?.length || 0) / productosPorPagina
  );

  const [productos, setProductos] = useState<IProductos[]>([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch(
        `http://190.221.207.224:8090/articulos/pagedPorSucursal/${sucursal.id}?page=${paginaActual}&size=${productosPorPagina}`
      );
      const data = await response.json();
      if (data && data.content) {
        setProductos(data.content);
      }
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [paginaActual, modificarProducto, eliminarProducto, crearProducto]);

  const handlePaginaAnterior = () => {
    setPaginaActual((prev) => Math.max(prev - 1, 0));
  };

  const handlePaginaSiguiente = () => {
    setPaginaActual((prev) => Math.min(prev + 1, totalPaginas - 1));
  };

  const initialForm: ICreateProducto = {
    denominacion: "",
    precioVenta: 0,
    descripcion: "",
    habilitado: true,
    codigo: "",
    idCategoria: 0,
    idAlergenos: [],
    imagenes: [],
  };

  const productosPagina =
    sucursal.productos?.slice(
      paginaActual * productosPorPagina,
      (paginaActual + 1) * productosPorPagina
    ) || [];

  return (
    <>
      <div className="tableProductos">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Habilitado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto: IProductos) => (
              <tr key={producto.id}>
                <td>{producto.denominacion}</td>
                <td>{producto.precioVenta}</td>
                <td className="descripcion">
                  <span>{producto.descripcion}</span>
                </td>
                <td>{producto.categoria.denominacion}</td>
                <td>{producto.habilitado ? "Si" : "No"}</td>
                <td>
                  <div className="buttonsAlergeno">
                    <button
                      className="visibility"
                      onClick={() => handleVerProducto(producto)}
                    >
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                    <button
                      className="edit"
                      onClick={() => handleModificarProducto(producto)}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleEliminarProducto(producto)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {totalPaginas === paginaActual + 1 && (
              <tr className="agregarProducto">
                <td colSpan={6}>
                  <button onClick={handleCrearProducto}>
                    AGREGAR PRODUCTO
                  </button>
                </td>
              </tr>
            )}

            {sucursal.productos?.length === 0 && (
              <tr className="agregarProducto">
                <td colSpan={6}>
                  <button onClick={handleCrearProducto}>
                    AGREGAR PRODUCTO
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePaginaAnterior} disabled={paginaActual === 0}>
            Anterior
          </button>
          <span>{`Página ${paginaActual + 1} de ${totalPaginas}`}</span>
          <button
            onClick={handlePaginaSiguiente}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </div>

      {crearProducto && (
        <CrearProducto
          sucursal={sucursal}
          initialForm={initialForm}
          handleCrearProducto={handleCrearProducto}
        />
      )}

      {modificarProducto && productoSeleccionado && (
        <ModificarProducto
          sucursal={sucursal}
          handleModificarProducto={() =>
            setModificarProducto(!modificarProducto)
          }
          producto={productoSeleccionado}
        />
      )}

      {verProducto && productoSeleccionado && (
        <VerProducto
          producto={productoSeleccionado}
          handleVerProducto={() => setVerProducto(!verProducto)}
        />
      )}

      {eliminarProducto && productoSeleccionado && (
        <EliminarProducto
          producto={productoSeleccionado}
          handleEliminarProducto={() => setEliminarProducto(!eliminarProducto)}
          sucursal={sucursal}
        />
      )}
    </>
  );
};
