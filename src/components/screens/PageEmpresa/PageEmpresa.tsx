import { Header } from "../../ui/Header/Header.tsx";
import { CardEmpresa } from "../../ui/CardEmpresa/CardEmpresa.tsx";
import { CardSucursal } from "../../ui/CardSucursal/CardSucursal.tsx";
import "./PageEmpresa.css";

export const PageEmpresa = () => {
  return (
    <div className="pageEmpresaContainer">
      <Header nombreVista="Vista empresas" />
      <div className="pageEmpresaSucursal">
        <CardEmpresa />
        <CardSucursal />
      </div>
    </div>
  );
};
