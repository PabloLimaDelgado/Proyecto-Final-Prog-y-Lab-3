import { CardEmpresa } from "./components/ui/CardEmpresa/CardEmpresa.tsx";
import { CardSucursal } from "./components/ui/CardSucursal/CardSucursal.tsx";
import { HeaderEmpresa } from "./components/ui/HeaderEmpresa/HeaderEmpresa.tsx";
import "./index.css";

export const App = () => {
  return (
    <>
      <HeaderEmpresa />
      <CardEmpresa />
      <CardSucursal />
    </>
  );
};
