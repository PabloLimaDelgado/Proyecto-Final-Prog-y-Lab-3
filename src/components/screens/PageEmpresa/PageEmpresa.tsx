import { Header } from "../../ui/Header/Header.tsx";
import "./PageEmpresa.css";
import { MenuEmpresa } from "../../ui/MenuEmpresa/MenuEmpresa.tsx";




export const PageEmpresa = () => {
  return (
    <div className="pageEmpresaContainer">
      <Header nombreVista="Vista empresas" />
      <div className="pageEmpresaSucursal">
        <MenuEmpresa />
      </div>
    </div>
  );
};
