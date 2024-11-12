import { IImagen } from "../../IImagen.ts";
import { baseDto } from "../baseDto/baseDto.ts";

export interface IUpdateProducto extends baseDto {
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  habilitado: boolean;
  imagenes: IImagen[];
  codigo: string;
  idCategoria: number;
  idAlergenos: number[];
}
