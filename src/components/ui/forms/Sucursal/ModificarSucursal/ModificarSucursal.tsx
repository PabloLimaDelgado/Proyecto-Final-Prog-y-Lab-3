import { FC, FormEvent, useEffect, useState } from "react";
import { useForm } from "../../../../../hooks/useForm.ts";
import { useAppDispatch } from "../../../../../hooks/redux.ts";
import { IProvincia } from "../../../../../types/IProvincia.ts";
import { ILocalidad } from "../../../../../types/ILocalidad.ts";
import { useFetch } from "../../../../../hooks/useFetch.ts";
import { IPais } from "../../../../../types/IPais.ts";
import { ISucursal } from "../../../../../types/dtos/sucursal/ISucursal.ts";
import { setModificarSucursal } from "../../../../../redux/slices/EmpresaReducer.ts";
import { IUpdateSucursal } from "../../../../../types/dtos/sucursal/IUpdateSucursal.ts";

interface IModificarSucursal {
  initialForm: IUpdateSucursal;
  handleSucursalModificar: () => void;
  sucursal: ISucursal;
}

export const ModificarSucursal: FC<IModificarSucursal> = ({
  initialForm,
  handleSucursalModificar,
  sucursal,
}) => {
  const { onInputChange, formState } = useForm<IUpdateSucursal>(initialForm);
  const [paisSeleccionado, setPaisSeleccionado] = useState<string>("");
  const [provinciaSeleccionada, setProvinciaSeleccionada] =
    useState<string>("");
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const dispatch = useAppDispatch();

  const { data: paises } = useFetch<IPais[]>(
    "http://190.221.207.224:8090/paises"
  );

  useEffect(() => {
    if (paisSeleccionado) {
      fetch(
        `http://190.221.207.224:8090/provincias/findByPais/${paisSeleccionado}`
      )
        .then((response) => response.json())
        .then((data: IProvincia[]) => setProvincias(data))
        .catch((error) => console.error("Error fetching provincias:", error));
    }
  }, [paisSeleccionado]);

  useEffect(() => {
    if (provinciaSeleccionada) {
      fetch(
        `http://190.221.207.224:8090/localidades/findByProvincia/${provinciaSeleccionada}`
      )
        .then((response) => response.json())
        .then((data: ILocalidad[]) => setLocalidades(data))
        .catch((error) => console.error("Error fetching localidades:", error));
    }
  }, [provinciaSeleccionada]);

  const handlePaisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaisSeleccionado(e.target.value);
    setProvinciaSeleccionada("");
    setLocalidades([]);
  };

  const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvinciaSeleccionada(e.target.value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response: Response = await fetch(
        `http://190.221.207.224:8090/sucursales/update/${sucursal.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formState,
            idEmpresa: sucursal.empresa.id,
          }),
        }
      );

      const updatedSucursal: ISucursal = await response.json();

      dispatch(
        setModificarSucursal({
          empresaId: sucursal.empresa.id,
          sucursal: updatedSucursal,
        })
      );
    } catch (error) {
      console.error(error);
    }

    handleSucursalModificar();
  };

  return (
    <div className="modalSucursal">
      <form onSubmit={onSubmit}>
        <h1>Modificar Sucursal</h1>
        <div className="divInputs">
          <div>
            <input
              type="text"
              placeholder="Ingrese un nombre"
              name="nombre"
              onChange={onInputChange}
              value={formState.nombre}
            />
            <label>Ingrese un horario de apertura</label>
            <input
              type="time"
              placeholder="Ingrese un horario de apertura"
              name="horarioApertura"
              onChange={onInputChange}
              value={formState.horarioApertura}
            />
            <label>Ingrese un horario de cierre</label>
            <input
              type="time"
              placeholder="Ingrese un horario de cierre"
              name="horarioCierre"
              onChange={onInputChange}
              value={formState.horarioCierre}
            />
            <div className="divHabilitado">
              <input
                type="checkbox"
                id="habilitado"
                name="esCasaMatriz"
                onChange={(e) =>
                  onInputChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked,
                    },
                  } as any)
                }
                checked={formState.esCasaMatriz}
              />
              <label htmlFor="habilitado">
                <span className="material-symbols-outlined">check</span>
              </label>
              <p>Casa Matriz</p>
            </div>
          </div>
          <div>
            <select name="pais" id="pais" onChange={handlePaisChange}>
              <option value="">Seleccione un país</option>
              {paises &&
                paises.map((pais) => (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))}
            </select>

            <select
              name="provincia"
              id="provincia"
              onChange={handleProvinciaChange}
              disabled={!paisSeleccionado}
            >
              <option value="">Seleccione una provincia</option>
              {provincias.length > 0 &&
                provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.nombre}
                  </option>
                ))}
            </select>
            <select
              name="domicilio.idLocalidad"
              id="localidad"
              disabled={!provinciaSeleccionada}
              onChange={onInputChange}
              value={formState.domicilio.idLocalidad}
            >
              <option value="">Seleccione una localidad</option>
              {localidades.length > 0 &&
                localidades.map((localidad) => (
                  <option key={localidad.id} value={localidad.id}>
                    {localidad.nombre}
                  </option>
                ))}
            </select>

            <input
              type="number"
              placeholder="Ingrese una latitud"
              name="latitud"
              onChange={onInputChange}
              value={formState.latitud ? formState.latitud : ""}
            />
            <input
              type="number"
              placeholder="Ingrese una longitud"
              name="longitud"
              onChange={onInputChange}
              value={formState.longitud ? formState.longitud : ""}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nombre de la calle"
              name="domicilio.calle"
              onChange={onInputChange}
              value={formState.domicilio.calle}
            />

            <input
              type="number"
              placeholder="Número de la calle"
              name="domicilio.numero"
              onChange={onInputChange}
              value={
                formState.domicilio.numero ? formState.domicilio.numero : ""
              }
            />
            <input
              type="number"
              placeholder="Código postal"
              name="domicilio.cp"
              onChange={onInputChange}
              value={formState.domicilio.cp ? formState.domicilio.cp : ""}
            />
            <input
              type="number"
              placeholder="Ingrese un número de piso"
              name="domicilio.piso"
              onChange={onInputChange}
              value={formState.domicilio.piso ? formState.domicilio.piso : ""}
            />
            <input
              type="number"
              placeholder="Ingrese un número de departamento"
              name="domicilio.nroDpto"
              onChange={onInputChange}
              value={
                formState.domicilio.nroDpto ? formState.domicilio.nroDpto : ""
              }
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Ingrese una imagen"
          className="divImagen"
          name="logo"
          onChange={onInputChange}
          value={formState.logo ? formState.logo : ""}
        />

        <div className="divButtonsSucursal">
          <button
            className="buttonRojoSucursalCrear"
            onClick={handleSucursalModificar}
            type="reset"
          >
            CANCELAR
          </button>
          <button className="buttonVerdeSucursalCrear" type="submit">
            ACEPTAR
          </button>
        </div>
      </form>
    </div>
  );
};
