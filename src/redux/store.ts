import { configureStore } from "@reduxjs/toolkit";
import EmpresaReducer from "./slices/EmpresaReducer.ts";
export const store = configureStore({
  reducer: {
    empresaReducer: EmpresaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

