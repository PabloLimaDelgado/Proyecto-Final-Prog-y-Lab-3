import { Header } from "../../ui/Header/Header.tsx";
import { CardEmpresa } from "../../ui/CardEmpresa/CardEmpresa.tsx";
import { CardSucursal } from "../../ui/CardSucursal/CardSucursal.tsx";
import "./PageEmpresa.css";

export const PageEmpresa = async () => {
  const data = await fetch("http://190.221.207.224:8090/empresas");
  const response = await data.json();

  const handleLog = async () => {
    console.log(response);
  };

  handleLog();

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
