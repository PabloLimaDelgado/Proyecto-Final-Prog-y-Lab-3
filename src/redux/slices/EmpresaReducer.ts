import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa.ts";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal.ts";
import { ICategorias } from "../../types/dtos/categorias/ICategorias.ts";
import { IProductos } from "../../types/dtos/productos/IProductos.ts";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos.ts";

interface InitialState {
  empresa: IEmpresa[];
  empresaEnviada: IEmpresa | null;
}

const initialState: InitialState = {
  empresa: [],
  empresaEnviada: null,
};

const EmpresaReducer = createSlice({
  name: "EmpresaReducer",
  initialState,
  reducers: {
    setEmpresas(state, action: PayloadAction<IEmpresa[]>) {
      state.empresa = action.payload;
    },

    setCrearEmpresa(state, action: PayloadAction<IEmpresa>) {
      state.empresa.push(action.payload);
    },

    setModificarEmpresa(state, action: PayloadAction<IEmpresa>) {
      const index = state.empresa.findIndex(
        (empresa) => empresa.id === action.payload.id
      );

      if (index !== -1) {
        state.empresa[index] = { ...state.empresa[index], ...action.payload };
      }
    },

    setAgregarSucursales(
      state,
      action: PayloadAction<{ empresaId: number; sucursales: ISucursal[] }>
    ) {
      const { empresaId, sucursales } = action.payload;
      const empresaIndex = state.empresa.findIndex(
        (empresa) => empresa.id === empresaId
      );

      if (empresaIndex !== -1) {
        state.empresa[empresaIndex].sucursales = [
          ...state.empresa[empresaIndex].sucursales,
          ...sucursales,
        ];
      }
    },

    setModificarSucursal(
      state,
      action: PayloadAction<{ empresaId: number; sucursal: ISucursal }>
    ) {
      const { empresaId, sucursal } = action.payload;
      const empresaIndex = state.empresa.findIndex(
        (empresa) => empresa.id === empresaId
      );

      if (empresaIndex !== -1) {
        const sucursalIndex = state.empresa[empresaIndex].sucursales.findIndex(
          (s) => s.id === sucursal.id
        );

        if (sucursalIndex !== -1) {
          state.empresa[empresaIndex].sucursales[sucursalIndex] = {
            ...state.empresa[empresaIndex].sucursales[sucursalIndex],
            ...sucursal,
          };
        }
      }
    },
    setEmpresaEnviada(
      state,
      action: PayloadAction<{ empresa: IEmpresa | null }>
    ) {
      state.empresaEnviada = action.payload.empresa || null;
    },

    setAgregarAlergenos(
      state,
      action: PayloadAction<{ alergeno: IAlergenos }>
    ) {
      const { alergeno } = action.payload;
      state.empresa.forEach((empresa) => {
        if (empresa.alergenos) {
          empresa.alergenos.push(alergeno);
        } else {
          empresa.alergenos = [alergeno];
        }
      });
    },

    setModificarAlergenos(
      state,
      action: PayloadAction<{ alergeno: IAlergenos }>
    ) {
      const { alergeno } = action.payload;

      state.empresa.forEach((empresa) => {
        if (empresa.alergenos) {
          const alergenoIndex = empresa.alergenos.findIndex(
            (alergenoId) => alergenoId.id === alergeno.id
          );

          if (alergenoIndex !== -1) {
            empresa.alergenos[alergenoIndex] = alergeno;
          }
        } else {
          empresa.alergenos = [alergeno];
        }
      });
    },

    setEliminarAlergeno(
      state,
      action: PayloadAction<{ alergeno: IAlergenos }>
    ) {
      const { alergeno } = action.payload;

      state.empresa.forEach((empresa) => {
        if (empresa.alergenos) {
          empresa.alergenos = empresa.alergenos.filter(
            (alergenoItem) => alergenoItem.id !== alergeno.id
          );
        }
      });
    },

    setAgregarProducto(
      state,
      action: PayloadAction<{ producto: IProductos; sucursalId: number }>
    ) {
      const { producto, sucursalId } = action.payload;

      state.empresa.forEach((empresa) => {
        const sucursal = empresa.sucursales?.find(
          (sucursal) => sucursal.id === sucursalId
        );

        if (sucursal && sucursal.productos) {
          sucursal.productos.push(producto);
        }
      });
    },

    setModificarProducto(
      state,
      action: PayloadAction<{ producto: IProductos; sucursalId: number }>
    ) {
      const { producto, sucursalId } = action.payload;

      state.empresa.forEach((empresa) => {
        const sucursal = empresa.sucursales?.find(
          (sucursal) => sucursal.id === sucursalId
        );

        if (sucursal && sucursal.productos) {
          console.log("entre");

          const productoIndex = sucursal.productos.findIndex(
            (prod) => prod.id === producto.id
          );

          if (productoIndex !== -1) {
            sucursal.productos[productoIndex] = producto;
          }
        }
      });
    },

    setEliminarProducto(
      state,
      action: PayloadAction<{ producto: IProductos; sucursalId: number }>
    ) {
      const { producto, sucursalId } = action.payload;

      state.empresa.forEach((empresa) => {
        const sucursal = empresa.sucursales?.find(
          (sucursal) => sucursal.id === sucursalId
        );

        if (sucursal && sucursal.productos) {
          // Filtra los productos para excluir el producto a eliminar
          sucursal.productos = sucursal.productos.filter(
            (prod) => prod.id !== producto.id
          );
        }
      });
    },

    setAgregarCategoria(
      state,
      action: PayloadAction<{ categoria: ICategorias; sucursalId: number }>
    ) {
      const { categoria, sucursalId } = action.payload;

      state.empresa.forEach((empresas) => {
        if (empresas.sucursales) {
          empresas.sucursales
            .find((sucursal) => sucursal.id === sucursalId)
            ?.categorias?.push(categoria);
        }
      });
    },

    setModificarCategoria(
      state,
      action: PayloadAction<{ categoria: ICategorias; sucursalId: number }>
    ) {
      const { categoria, sucursalId } = action.payload;

      state.empresa.forEach((empresa) => {
        const sucursal = empresa.sucursales?.find(
          (sucursal) => sucursal.id === sucursalId
        );

        if (sucursal && sucursal.productos) {
          const categoriaIndex = sucursal.categorias.findIndex(
            (cat) => cat.id === cat.id
          );

          if (categoriaIndex !== -1) {
            sucursal.categorias[categoriaIndex] = categoria;
          }
        }
      });
    },
  },
});

export const {
  setEmpresas,
  setModificarEmpresa,
  setCrearEmpresa,
  setAgregarSucursales,
  setModificarSucursal,
  setEmpresaEnviada,
  setAgregarAlergenos,
  setModificarAlergenos,
  setEliminarAlergeno,
  setAgregarProducto,
  setModificarProducto,
  setEliminarProducto,
  setAgregarCategoria,
  setModificarCategoria,
} = EmpresaReducer.actions;
export default EmpresaReducer.reducer;
