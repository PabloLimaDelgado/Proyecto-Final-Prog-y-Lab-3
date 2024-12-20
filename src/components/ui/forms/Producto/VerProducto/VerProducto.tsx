import { FC } from "react";
import { IProductos } from "../../../../../types/dtos/productos/IProductos";
import "./VerProducto.css";

interface IVerProducto {
  producto: IProductos;
  handleVerProducto: () => void;
}
export const VerProducto: FC<IVerProducto> = ({
  producto,
  handleVerProducto,
}) => {
  return (
    <>
      <div className="verProductoContainer">
        <div className="verProducto">
          <h1>Producto</h1>
          <div className="infoProducto">
            <div className="infoColumn">
              <p>
                <span>Nombre: </span>
                {producto.denominacion}
              </p>

              <p>
                <span>Categoria: </span>
                {producto.categoria.denominacion}
              </p>

              <p>
                <span>Precio:</span>

                {producto.precioVenta}
              </p>
              <div>
                <span>Descripcion: </span>
                {producto.descripcion}
              </div>
            </div>
            <div className="infoColumn">
              <div className="alergenos">
                <span>Alergenos: </span>
                <p>
                  {producto.alergenos
                    .map((alergeno) => alergeno.denominacion)
                    .join(" - ")}
                </p>
              </div>
              <div className="divImagenProducto">
                <span>Imagen: </span>
                <div>
                  {producto.imagenes.map((imagenes) => (
                    <img src={imagenes.url} alt="" key={imagenes.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="buttonVerde" onClick={handleVerProducto}>
            CERRAR
          </button>
        </div>
      </div>
    </>
  );
};
