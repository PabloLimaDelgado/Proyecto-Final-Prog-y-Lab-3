import { IProductos } from "../productos/IProductos.ts";
import { ISucursal } from "../sucursal/ISucursal.ts";

export interface ICategorias {
  id: number;
  denominacion: string;
  eliminado: boolean;
  sucursales: ISucursal[];
  subCategorias: ICategorias[];
  categoriaPadre?: ICategorias | null;
  articulos: IProductos;
}
