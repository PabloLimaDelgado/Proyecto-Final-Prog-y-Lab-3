import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa.ts";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal.ts";

interface InitialState {
  empresa: IEmpresa[];
  empresaEnviada:IEmpresa | null;
}

const initialState: InitialState = {
  empresa: [],
  empresaEnviada:null

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
    setEmpresaEnviada(state, action: PayloadAction<{empresa : IEmpresa | null}>){
      
      state.empresaEnviada = action.payload.empresa ||null
    }
  },
});

export const {
  setEmpresas,
  setModificarEmpresa,
  setCrearEmpresa,
  setAgregarSucursales,
  setModificarSucursal,
  setEmpresaEnviada,
} = EmpresaReducer.actions;
export default EmpresaReducer.reducer;
