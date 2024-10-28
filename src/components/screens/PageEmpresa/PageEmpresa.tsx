import { Header } from "../../ui/Header/Header.tsx";
// import { CardEmpresa } from "../../ui/CardEmpresa/CardEmpresa.tsx";
import {  PageSucursal } from "../../ui/PageSucursal/PageSucursal.tsx";
import "./PageEmpresa.css";
import { MenuEmpresa } from "../../ui/MenuEmpresa/MenuEmpresa.tsx";
// import { CardEmpresa } from "../../ui/CardEmpresa/CardEmpresa.tsx";

export const PageEmpresa = () => {
  return (
    <div className="pageEmpresaContainer">
      <Header nombreVista="Vista empresas" />
      <div className="pageEmpresaSucursal">
        {/* <CardEmpresa /> */}
        <MenuEmpresa/>
        <PageSucursal />
      </div>
    </div>
  );
};
