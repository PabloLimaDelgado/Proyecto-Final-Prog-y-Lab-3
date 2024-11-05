import { FC, FormEvent } from "react";
import { IProductos } from "../../../../../types/dtos/productos/IProductos.ts";
import "./EliminarProducto.css";
import { useDispatch } from "react-redux";
import { setEliminarProducto } from "../../../../../redux/slices/EmpresaReducer.ts";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal.ts";

interface IEliminarProducto {
  producto: IProductos;
  handleEliminarProducto: () => void;
  sucursal?: ISucursal;
}

export const EliminarProducto: FC<IEliminarProducto> = ({
  producto,
  handleEliminarProducto,
  sucursal,
}) => {
  const dispatch = useDispatch();

  const handleEliminarProductoAcept = async (
    event: FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        `http://190.221.207.224:8090/articulos/${producto.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: IProductos = producto;

      if (sucursal?.id) {
        dispatch(
          setEliminarProducto({
            producto: data,
            sucursalId: sucursal?.id,
          })
        );
      }
    } catch (error) {
      console.error("Error", error);
    }

    handleEliminarProducto();
  };
  return (
    <>
      <div className="eliminarProductoContainer">
        <div className="eliminarProducto">
          <h1>Eliminar Producto</h1>
          <div className="buttons">
            <button onClick={handleEliminarProducto} className="buttonRojo">
              CERRAR
            </button>
            <button
              className="buttonVerde"
              onClick={handleEliminarProductoAcept}
            >
              ACEPAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
