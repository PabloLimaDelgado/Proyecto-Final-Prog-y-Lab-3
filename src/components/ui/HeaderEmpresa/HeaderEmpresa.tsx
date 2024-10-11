import "./HeaderEmpresa.css";

export const HeaderEmpresa = () => {
  return (
    <>
      <div className="headerEmpresa">
        <h1>Empresas</h1>
        <button>AGREGAR UNA EMPRESA</button>
      </div>
      <div className="headerSucursal">
        <div>
          <h1>Sucursales en: </h1>
          <p> Bentido Rufian</p>
        </div>
        <button>AGREGAR UNA SUCURSAL</button>
      </div>
    </>
  );
};
