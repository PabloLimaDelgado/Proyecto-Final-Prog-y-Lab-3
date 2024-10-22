import { ILocalidad } from "./ILocalidad.ts";

export interface IDomicilio {
  id: number;
  calle: string;
  numero: number;
  cp: number;
  piso: number;
  eliminado?: boolean;
  nroDpto: number;
  localidad: ILocalidad;
}
