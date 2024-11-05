import { FC, useEffect, useState } from "react";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal.ts";
import "./TablaCategorias.css";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias.ts";
import { CrearCategoria } from "../../forms/Categoria/CrearCategoria/CrearCategoria.tsx";
import { ModificarCategoria } from "../../forms/Categoria/ModificarCategoria/ModificarCategoria.tsx";
import { CrearSubcategoria } from "../../forms/Categoria/CrearSubcategoria/CrearSubcategoria.tsx";
import { ModificarSubcategoria } from "../../forms/Categoria/ModificarSubcategoria/ModificarSubcategoria.tsx";

interface ITablaCategorias {
  sucursal?: ISucursal;
}

export const TablaCategorias: FC<ITablaCategorias> = ({ sucursal }) => {
  const [crearCategoriasPadre, setCrearCategoriasPadre] =
    useState<boolean>(false);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [categoriaPadreSeleccionada, setCategoriaPadreSeleccionada] =
    useState<ICategorias | null>(null);
  const [modificarCategoriaPadre, setModificarCategoriaPadre] =
    useState<boolean>(false);
  const [crearSubcategoria, setCrearSubcategoria] = useState<boolean>(false);
  const [modificarSubcategoria, setModificarSubcategoria] =
    useState<boolean>(false);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] =
    useState<ICategorias | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      if (sucursal?.empresa) {
        const data: ICategorias[] = await getCategoriasByEmpresa(
          sucursal.empresa.id
        );

        // Filtra y asigna las subcategorías con su categoría padre correspondiente
        const categoriasSucursal = data
          .filter((categoria) =>
            categoria.sucursales?.some((suc) => suc.id === sucursal.id)
          )
          .map((categoria) => {
            if (categoria.subCategorias) {
              // Añade el atributo categoriaPadre en cada subcategoría
              categoria.subCategorias = categoria.subCategorias.map(
                (subcategoria) => ({
                  ...subcategoria,
                  categoriaPadre: { ...categoria },
                })
              );
            }
            return categoria;
          });

        setCategorias(categoriasSucursal);
      }
    };

    fetchCategorias();
  }, [sucursal]);

  const getCategoriasByEmpresa = async (
    empresaId: number
  ): Promise<ICategorias[]> => {
    try {
      const response = await fetch(
        `http://190.221.207.224:8090/categorias/allCategoriasPorEmpresa/${empresaId}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener categorías");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      return [];
    }
  };

  const handleCrearCategoriasPadre = () => {
    setCrearCategoriasPadre(!crearCategoriasPadre);
  };

  const handleModificarCategoriaPadre = (categoria: ICategorias) => {
    setCategoriaPadreSeleccionada(categoria);
    setModificarCategoriaPadre(!modificarCategoriaPadre);
    console.log(categoria);
  };

  const handleCrearSubcategoria = (categoria: ICategorias) => {
    setCategoriaPadreSeleccionada(categoria);
    setCrearSubcategoria(!crearSubcategoria);
  };

  const handleModificarSubcategoria = (categoria: ICategorias) => {
    setSubcategoriaSeleccionada(categoria);
    setModificarSubcategoria(!modificarSubcategoria);
    console.log(categoria);
  };
  return (
    <>
      <div className="tableCategorias">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Subcategorias</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias
              .filter((categoria) => categoria.categoriaPadre === null)
              .map((categoriaPadre) => (
                <tr key={categoriaPadre.id}>
                  <td>
                    <p>{categoriaPadre.denominacion}</p>
                  </td>
                  <td colSpan={1}>
                    {categoriaPadre.subCategorias.length > 0 && (
                      <div className="subcategorias">
                        <ul>
                          {categoriaPadre.subCategorias.map((subCategoria) => (
                            <li key={subCategoria.id}>
                              <p>-{subCategoria.denominacion}</p>

                              <button
                                className="edit"
                                onClick={() =>
                                  handleModificarSubcategoria(subCategoria)
                                }
                              >
                                <span className="material-symbols-outlined">
                                  edit
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                  <td>
                    <button className="editCategoria">
                      <span
                        className="material-symbols-outlined"
                        onClick={() =>
                          handleModificarCategoriaPadre(categoriaPadre)
                        }
                      >
                        edit
                      </span>
                    </button>

                    <button className="add">
                      <span
                        className="material-symbols-outlined"
                        onClick={() => handleCrearSubcategoria(categoriaPadre)}
                      >
                        add
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            <tr className="agregarCategoria">
              <td colSpan={3}>
                <button onClick={handleCrearCategoriasPadre}>
                  AGREGAR CATEGORIA
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {crearCategoriasPadre && sucursal?.empresa && (
        <CrearCategoria
          handleCrearCategoriasPadre={handleCrearCategoriasPadre}
          sucursal={sucursal}
        />
      )}

      {modificarCategoriaPadre && sucursal && categoriaPadreSeleccionada && (
        <ModificarCategoria
          sucursal={sucursal}
          categoria={categoriaPadreSeleccionada}
          handleModificarCategoriaPadre={() =>
            setModificarCategoriaPadre(false)
          }
        />
      )}

      {crearSubcategoria && sucursal?.empresa && categoriaPadreSeleccionada && (
        <CrearSubcategoria
          sucursal={sucursal}
          categoriaPadre={categoriaPadreSeleccionada}
          handleCrearSubcategoria={() => setCrearSubcategoria(false)}
        />
      )}

      {modificarSubcategoria &&
        sucursal?.empresa &&
        subcategoriaSeleccionada?.categoriaPadre && (
          <ModificarSubcategoria
            sucursal={sucursal}
            categoriaPadre={subcategoriaSeleccionada.categoriaPadre}
            subcategoriaSeleccionada={subcategoriaSeleccionada}
            handleModificarSubcategoria={() => setModificarSubcategoria(false)}
          />
        )}
    </>
  );
};
