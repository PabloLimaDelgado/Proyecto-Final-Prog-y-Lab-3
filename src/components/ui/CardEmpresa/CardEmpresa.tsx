import "./CardEmpresa.css";

export const CardEmpresa = () => {
  return (
    <div className="cardEmpresaSide">
      <h1>Empresas</h1>
      <div className="cardEmpresaContainer">
        <div className="cardEmpresa">
          <h2>Bendito Rufian</h2>
          <img
            src="https://i.pinimg.com/enabled_lo/564x/7f/32/83/7f3283c5833146ebb7c87b2996843586.jpg"
            alt=""
          />
          <div>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>

        <div className="cardEmpresa">
          <h2>Bendito Rufian</h2>
          <img
            src="https://i.pinimg.com/enabled_lo/564x/7f/32/83/7f3283c5833146ebb7c87b2996843586.jpg"
            alt=""
          />
          <div>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>

        <div className="cardEmpresa">
          <h2>Bendito Rufian</h2>
          <img
            src="https://i.pinimg.com/enabled_lo/564x/7f/32/83/7f3283c5833146ebb7c87b2996843586.jpg"
            alt=""
          />
          <div>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>

        <div className="cardEmpresa">
          <h2>Bendito Rufian</h2>
          <img
            src="https://i.pinimg.com/enabled_lo/564x/7f/32/83/7f3283c5833146ebb7c87b2996843586.jpg"
            alt=""
          />
          <div>
            <button className="edit">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="visibility">
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>
        
        <div className="cardEmpresaButton">
          <button>
            <h2>Agregar Empresa</h2>
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
