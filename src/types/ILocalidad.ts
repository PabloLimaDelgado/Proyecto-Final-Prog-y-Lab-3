import { IProvincia } from "./IProvincia.ts";

export interface ILocalidad {
  id: number;
  nombre: string;
  provincia: IProvincia;
}
