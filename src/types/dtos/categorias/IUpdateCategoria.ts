import { baseDto } from "../baseDto/baseDto.ts";

export interface IUpdateCategoria extends baseDto {
  id: number;
  denominacion: string;
  eliminado: boolean;
  idEmpresa: number;
  idSucursales: number[];
  idCategoriaPadre?: number | null;
}
