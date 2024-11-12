import { ICategorias } from "../categorias/ICategorias.ts";
import { baseDto } from "../baseDto/baseDto.ts";

export interface IUpdateSucursal extends baseDto {
  nombre: string;
  idEmpresa: number;
  eliminado: boolean;
  latitud: number;
  longitud: number;
  domicilio: {
    id: number;
    calle: string;
    numero: number;
    cp: number;
    piso: number;
    nroDpto: number;
    idLocalidad: number;
  };
  logo: string | null;
  categorias: ICategorias[];
  esCasaMatriz: boolean;
  horarioApertura: string;
  horarioCierre: string;
}