import "./PageMenu.css";
import { Header } from "../../ui/Header/Header.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuOpciones } from "../../ui/MenuOpciones/MenuOpciones.tsx";
import { FC, useEffect } from "react";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.ts";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa.ts";
import { useFetch } from "../../../hooks/useFetch.ts";
import { setEmpresas } from "../../../redux/slices/EmpresaReducer.ts";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias.ts";
import { IProductos } from "../../../types/dtos/productos/IProductos.ts";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos.ts";

export const PageMenu: FC = () => {
  const navigate = useNavigate();

  const handleNavigateButton = () => {
    navigate("/vistaEmpresa");
  };

  const location = useLocation();
  const empresa: IEmpresa = location.state?.empresa;
  const sucursal: ISucursal = location.state?.sucursal;

  const { data } = useFetch<IEmpresa[]>("http://190.221.207.224:8090/empresas");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchEmpresasConSucursalesYCategorias = async () => {
      if (data) {
        // Obtener alérgenos
        const alergenos = await getAlergenos();

        const empresasConSucursalesYCategorias = await Promise.all(
          data.map(async (empresa) => {
            // Obtener sucursales
            const sucursales = await obtenerSucursalesPorEmpresa(empresa.id);

            // Obtener categorías y productos con alérgenos para cada sucursal
            const sucursalesConCategoriasYProductos = await Promise.all(
              sucursales.map(async (sucursal) => {
                const categorias = await getCategoriasBySucursal(sucursal.id);
                const productos = await getArticuloBySucursal(sucursal.id);

                return {
                  ...sucursal,
                  categorias: categorias || [],
                  productos: productos || [],
                };
              })
            );

            return {
              ...empresa,
              sucursales: sucursalesConCategoriasYProductos || [],
              alergenos: alergenos,
            };
          })
        );

        dispatch(setEmpresas(empresasConSucursalesYCategorias));
      }
    };

    fetchEmpresasConSucursalesYCategorias();
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

  const getCategoriasBySucursal = async (
    sucursalId: number
  ): Promise<ICategorias[]> => {
    try {
      const response = await fetch(
        `http://190.221.207.224:8090/categorias/allCategoriasPorSucursal/${sucursalId}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener categorias");
      }
      const categorias: ICategorias[] = await response.json();
      return categorias;
    } catch (error) {
      console.error("Error fetching sucursales:", error);
      return [];
    }
  };

  const getArticuloBySucursal = async (
    sucursalId: number
  ): Promise<IProductos[]> => {
    try {
      const response = await fetch(
        `http://190.221.207.224:8090/articulos/porSucursal/${sucursalId}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      const productos: IProductos[] = await response.json();
      return productos;
    } catch (error) {
      console.error("Error fetching sucursales:", error);
      return [];
    }
  };

  const getAlergenos = async (): Promise<IAlergenos[]> => {
    try {
      const response = await fetch("http://190.221.207.224:8090/alergenos");

      if (!response.ok) {
        throw new Error("Error al obtener productos");
      }
      const alergenos: IAlergenos[] = await response.json();
      return alergenos;
    } catch (error) {
      console.error("Error fetching sucursales:", error);
      return [];
    }
  };

  const empresaSeleccionada = useAppSelector((state) =>
    state.empresaReducer.empresa.find((e) => e.id === empresa.id)
  );

  const sucursalSeleccionada = empresaSeleccionada?.sucursales.find(
    (suc) => suc.id === sucursal.id
  );

  return (
    <div className="pageMenuContainer">
      <button className="buttonBack" onClick={handleNavigateButton}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <Header
        nombreVista={`${empresaSeleccionada?.nombre} - ${sucursal?.nombre}`}
      />

      <div className="pageMenuTablas">
        <MenuOpciones
          sucursal={sucursalSeleccionada}
          empresa={empresaSeleccionada}
        />
      </div>
    </div>
  );
};
