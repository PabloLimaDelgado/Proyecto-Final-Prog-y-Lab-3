import { IImagen } from "../../IImagen.ts";

export interface ICreateAlergeno {
  denominacion: string;
  imagen: IImagen | null;
}
