import "./PageEmpresa.css";
import { MenuEmpresa } from "../../ui/MenuEmpresa/MenuEmpresa.tsx";




export const PageEmpresa = () => {
  return (
    <div className="pageEmpresaContainer">
      <div className="pageEmpresaSucursal">
        <MenuEmpresa />
      </div>
    </div>
  );
};
