import { IImagen } from "../../IImagen.ts";
import { baseDto } from "../baseDto/baseDto.ts";

export interface IUpdateAlergeno extends baseDto {
  denominacion: string;
  imagen: IImagen | null;
}
