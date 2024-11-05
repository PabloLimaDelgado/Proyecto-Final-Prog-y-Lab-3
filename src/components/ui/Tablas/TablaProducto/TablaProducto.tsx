import { FC, useEffect, useState } from "react";
import "./TablaProducto.css";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto.ts";
import { CrearProducto } from "../../forms/Producto/CrearProducto/CrearProducto.tsx";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal.ts";
import { IProductos } from "../../../../types/dtos/productos/IProductos.ts";
import { ModificarProducto } from "../../forms/Producto/ModificarProducto/ModificarProducto.tsx";
import { VerProducto } from "../../forms/Producto/VerProducto/VerProducto.tsx";
import { EliminarProducto } from "../../forms/Producto/EliminarProducto/EliminarProducto.tsx";
import { useFetch } from "../../../../hooks/useFetch.ts";

interface ITablaProducto {
  sucursal?: ISucursal;
}

export const TablaProducto: FC<ITablaProducto> = ({ sucursal }) => {
  const [crearProducto, setCrearProducto] = useState<boolean>(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<IProductos | null>(null);
  const [modificarProducto, setModificarProducto] = useState<boolean>(false);
  const [verProducto, setVerProducto] = useState<boolean>(false);
  const [eliminarProducto, setEliminarProducto] = useState<boolean>(false);

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

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const itemsPorPagina = 5;
  const [dataNueva, setDataNueva] = useState<any>(null); // Estado para almacenar data

  const { data } = useFetch<any>(
    `http://190.221.207.224:8090/articulos/pagedPorSucursal/${sucursal?.id}?page=${paginaActual}&size=${itemsPorPagina}`
  );

  const { data: produtos } = useFetch<IProductos[]>(
    `http://190.221.207.224:8090/articulos/porSucursal/${sucursal?.id}`
  );

  useEffect(() => {
    if (data) {
      setTotalPaginas(data.totalPages);
      setDataNueva(data);
    }
  }, [data, produtos, sucursal]);

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

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
            {data &&
            data.content &&
            data.content.length > 0 &&
            sucursal?.productos
              ? data.content.map((producto: IProductos) => {
                  const { productos = [] } = sucursal;

                  const productoSucursal = productos.find(
                    (prod) => prod.id === producto.id
                  );

                  console.log(productoSucursal);

                  return (
                    <tr key={producto.id}>
                      <td>{productoSucursal?.denominacion}</td>
                      <td>{productoSucursal?.precioVenta}</td>
                      <td>
                        <div className="descripcion">
                          {productoSucursal?.descripcion}
                        </div>
                      </td>
                      {/* Usa categoriaProducto aquí */}
                      <td>{producto.categoria.denominacion}</td>
                      <td>{productoSucursal?.habilitado ? "Sí" : "No"}</td>
                      <td>
                        <div className="buttonsAlergeno">
                          <button
                            className="visibility"
                            onClick={() =>
                              handleVerProducto(
                                productoSucursal ? productoSucursal : producto
                              )
                            }
                          >
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </button>
                          <button
                            className="edit"
                            onClick={() =>
                              handleModificarProducto(
                                productoSucursal ? productoSucursal : producto
                              )
                            }
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                          <button
                            className="delete"
                            onClick={() =>
                              handleEliminarProducto(
                                productoSucursal ? productoSucursal : producto
                              )
                            }
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : sucursal && produtos?.map((produtoSinPafina) => {
                  const { productos = [] } = sucursal;
                  const productoSucursal = productos.find(
                    (prod) => prod.id === produtoSinPafina.id
                  );

                  return (
                    <tr key={produtoSinPafina.id}>
                      <td>{productoSucursal?.denominacion}</td>
                      <td>{productoSucursal?.precioVenta}</td>
                      <td>
                        <div className="descripcion">
                          {productoSucursal?.descripcion}
                        </div>
                      </td>
                      <td>
                        {produtoSinPafina.categoria?.denominacion ||
                          "Sin categoría"}
                      </td>
                      <td>{productoSucursal?.habilitado ? "Sí" : "No"}</td>
                      <td>
                        <div className="buttonsAlergeno">
                          <button
                            className="visibility"
                            onClick={() =>
                              handleVerProducto(
                                productoSucursal || produtoSinPafina
                              )
                            }
                          >
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </button>
                          <button
                            className="edit"
                            onClick={() =>
                              handleModificarProducto(
                                productoSucursal || produtoSinPafina
                              )
                            }
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                          <button
                            className="delete"
                            onClick={() =>
                              handleEliminarProducto(
                                productoSucursal || produtoSinPafina
                              )
                            }
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            <tr className="agregarProducto">
              <td colSpan={6}>
                <button onClick={handleCrearProducto}>AGREGAR PRODUCTO</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePaginaAnterior} disabled={paginaActual === 1}>
            Anterior
          </button>
          <span>{`Página ${paginaActual} de ${totalPaginas}`}</span>
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
