import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import "./VerEmpresa.css";

interface IVerEmpresa {
  empresa: IEmpresa;
  handleEmpresaVIew: () => void;
}

export const VerEmpresa = ({ empresa, handleEmpresaVIew }: IVerEmpresa) => {
  return (
    <>
      <div className="verEmpresaContainer">
        <div className="verEmpresa">
          <h1>Empresa</h1>
          <div>
            <p>
              <span>Nombre: </span>
              {empresa.nombre}
            </p>
            <p>
              <span>Razón social: </span>
              {empresa.razonSocial}
            </p>
            <p>
              <span>Cuit: </span>
              {empresa.cuit}
            </p>
            <div className="divImagenEmpresa">
              <span>Logo: </span>
              <img src={empresa.logo ? empresa.logo : ""} alt="" />
            </div>
          </div>

          <button className="buttonVerde" onClick={handleEmpresaVIew}>
            CERRAR
          </button>
        </div>
      </div>
    </>
  );
};
