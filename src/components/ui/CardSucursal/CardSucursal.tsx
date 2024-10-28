import { useNavigate } from "react-router-dom";
import { ISUCURSAL } from "../../../types/dtos/sucursal/ISucursal"

interface cardSucursalProps{
    sucursal: ISUCURSAL
}

export const CardSucursal: React.FC<cardSucursalProps> = ({sucursal}) => {
    
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/vistaMenu");
  };
  return (
      <div className="cartaSucursal" onClick={handleNavigate}>
        <h1>{`${sucursal.nombreEmpresa} - ${sucursal.nombre}`}</h1>
        <p>{`Apertura ${sucursal.horarioApertura} - ${sucursal.horarioCierra}`}</p>
        <img src={sucursal.imagen} alt="" />
        <div>
          <button className="location">
            <span className="material-symbols-outlined">location_city</span>
          </button>
          <button className="edit">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="visibility">
            <span className="material-symbols-outlined">visibility</span>
          </button>
        </div>
      </div>

  )
}
