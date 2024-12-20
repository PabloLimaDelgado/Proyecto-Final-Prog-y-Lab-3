import { IPais } from "../../IPais.ts";
import { IAlergenos } from "../alergenos/IAlergenos.ts";
import { ISucursal } from "../sucursal/ISucursal.ts";

export interface IEmpresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuit: number;
  logo: string | null;
  sucursales: ISucursal[];
  pais: IPais;
  alergenos?: IAlergenos[];
}
