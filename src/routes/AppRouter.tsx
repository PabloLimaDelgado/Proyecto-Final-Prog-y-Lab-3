import { Navigate, Route, Routes } from "react-router-dom";
import { PageEmpresa } from "../components/screens/PageEmpresa/PageEmpresa.tsx";
import { PageMenu } from "../components/screens/PageMenu/PageMenu.tsx";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/vistaEmpresa" replace />} />
        <Route path="/vistaEmpresa" element={<PageEmpresa />} />
        <Route path="/vistaMenu" element={<PageMenu />} />
      </Routes>
    </>
  );
};
