import { IImagen } from "../../IImagen.ts";

export interface ICreateProducto {
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  habilitado: boolean;
  codigo: string;
  idCategoria: number;
  idAlergenos: number[];
  imagenes: IImagen[]
}
