import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import searchGeralReducer from "./searchGeral";
import ProdutoSlice from "./produtoSlice";
import fornecedorSlicee from "./fornecedorSlicee";


import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
    reducer: {
        Search: searchGeralReducer,
        Produto: ProdutoSlice,
        Fornecedor: fornecedorSlicee
    },
    middleware: [thunkMiddleware],
})

//Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
//Inferred type: {Search:SearchState,...}
export type AppDispatch = typeof store.dispatch