
import { IImagen } from "../../IImagen.ts";
import { IAlergenos } from "../alergenos/IAlergenos.ts";
import { ICategorias } from "../categorias/ICategorias.ts";

export interface IProductos {
  id: number;
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  categoria: ICategorias;
  eliminado: boolean;
  habilitado: boolean;
  codigo: string;
  alergenos: IAlergenos[];
  imagenes: IImagen[];
}
