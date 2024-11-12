import { baseDto } from "../baseDto/baseDto.ts";

export interface IUpdateEmpresaDto extends baseDto {
  nombre: string;
  razonSocial: string;
  cuit: number;
  logo: string | null;
}
