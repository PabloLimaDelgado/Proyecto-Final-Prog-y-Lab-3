import "./PageMenu.css";
import { useNavigate } from "react-router-dom";
import { MenuOpciones } from "../../ui/MenuOpciones/MenuOpciones.tsx";

export const PageMenu = () => {
  const navigate = useNavigate();

  const handleNavigateButton = () => {
    navigate("/vistaEmpresa");
  };

  return (
    <div className="pageMenuContainer">
      <button className="buttonBack" onClick={handleNavigateButton}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <Header nombreVista="Bendito Rufian - La Barraca " />
      <div className="pageMenuTablas">
        <MenuOpciones />
      </div>
    </div>
  );
};
