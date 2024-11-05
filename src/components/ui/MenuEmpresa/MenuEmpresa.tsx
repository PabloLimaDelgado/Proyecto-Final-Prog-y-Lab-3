import { Button } from "react-bootstrap";
import styles from "./MenuEmpresa.module.css";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch.ts";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import { setEmpresas } from "../../../redux/slices/EmpresaReducer.ts";
import { HeaderdEmpresa } from "../HeaderdEmpresa/HeaderdEmpresa.tsx";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto.ts";
import { PageSucursal } from "../PageSucursal/PageSucursal.tsx";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal.ts";
import { CrearEmpresa } from "../forms/CrearEmpresa/CrearEmpresa.tsx";
import { PageEmpresa } from "../PageEmpresa/PageEmpresa.tsx";

export const MenuEmpresa = () => {
  const [showBusinees, setShowBusinnes] = useState<boolean>(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] =
    useState<boolean>(false);
  const [empresaEnviada, setEmpresaEnviada] = useState<IEmpresa | null>(null);
  const [crearEmpresa, setCrearEmpresa] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { data } = useFetch<IEmpresa[]>("http://190.221.207.224:8090/empresas");

  useEffect(() => {
    const fetchEmpresasConSucursales = async () => {
      if (data) {
        const empresasConSucursales = await Promise.all(
          data.map(async (empresa) => {
            const sucursales = await obtenerSucursalesPorEmpresa(empresa.id);
            return {
              ...empresa,
              sucursales: sucursales || [],
            };
          })
        );
        dispatch(setEmpresas(empresasConSucursales));
      }
    };

    fetchEmpresasConSucursales();
  }, [data, dispatch]);

  const obtenerSucursalesPorEmpresa = async (
    empresaId: number
  ): Promise<ISucursal[]> => {
    try {
      const response = await fetch(
        `http://190.221.207.224:8090/sucursales/porEmpresa/${empresaId}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener sucursales");
      }

      const sucursales: ISucursal[] = await response.json();
      return sucursales;
    } catch (error) {
      console.error("Error fetching sucursales:", error);
      return [];
    }
  };

  const empresas = useAppSelector((state) => state.empresaReducer.empresa);

  const initialForm: ICreateEmpresaDto = {
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: "",
  };

  const handleBusinnes = () => {
    setShowBusinnes(!showBusinees);
  };

  const handleCrearEmpresa = () => {
    setCrearEmpresa(!crearEmpresa);
  };

  return (
    <>
      <div className={styles.menuEmpresa}>
        <button
          className="d-flex w-100 p-2 gap-2 text-align-center align-items-center justify-content-center "
          style={{
            height: "10%",
            justifyContent: "center",
            width: "100px",
            background: "none",
            border: "none",
            color:'white'
          }}
          onClick={handleBusinnes}
        >
          <h2 className="m-0">Empresas</h2>
          <FiChevronDown style={{ fontSize: "2.5rem", paddingTop: "2%" }} />
        </button>
        {showBusinees ? (
          <div
            className={`d-flex flex-column w-100 gap-3 mt-4 align-items-center empresaScrollbar ${styles.empresaScrollbar}`}
            style={{ height: "auto", overflowX: "hidden" }}
          >
            {empresas.map((empresa) => (
              <div
                key={empresa.id}
                className="d-flex  align-items-center justify-content-center"
                style={{ width: "100%" }}
              >
                <Button
                  variant="outline-light"
                  style={{ width: "80%", maxWidth: "300px" }}
                  onClick={() => {
                    setEmpresaEnviada(empresa);
                    setEmpresaSeleccionada(true);
                  }}
                >
                  {empresa.nombre}
                </Button>
              </div>
            ))}

            <Button
              variant="outline-light"
              className="d-flex  align-items-center justify-content-center "
              style={{ width: "80%", maxWidth: "300px" }}
              onClick={() => {
                setEmpresaEnviada(null);
                setEmpresaSeleccionada(false);
              }}
            >
              Ver Empresas
            </Button>
            <Button
              variant="outline-light"
              className="d-flex  align-items-center justify-content-center "
              style={{ width: "80%", maxWidth: "300px" }}
              onClick={handleCrearEmpresa}
            >
              Agregar Empresa
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={styles.cardEmpresaSucursales}>
        {/* { empresaEnviada && ( */}
          <HeaderdEmpresa empresa={empresaEnviada} />
        {/* )} */}

        {empresaSeleccionada && empresaEnviada ?(
          <PageSucursal empresa={empresaEnviada} />
        ):(<PageEmpresa empresas={empresas}/>) }
      </div>

      {crearEmpresa && (
        <CrearEmpresa
          handleCrearEmpresa={handleCrearEmpresa}
          initialForm={initialForm}
        />
      )}
    </>
  );
};
