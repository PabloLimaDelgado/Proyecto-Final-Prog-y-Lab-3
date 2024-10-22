import { IDomicilio } from "../../IDomicilio.ts";
import { ICategorias } from "../categorias/ICategorias.ts";
import { IEmpresa } from "../empresa/IEmpresa.ts";


export interface ISucursal {
  id: number;
  nombre: string;
  empresa: IEmpresa;
  domicilio: IDomicilio;
  calle: string;
  latitud: number;
  longitud: number;
  categorias: ICategorias[];
  esCasaMatriz: boolean;
  horarioApertura: string;
  eliminado: boolean;
  horarioCierre: string;
  logo?: string;
}
