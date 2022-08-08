import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import searchGeralReducer from "./searchGeral";
import ProdutoSlice from "./produtoSlice";




export const store = configureStore({
    reducer: {
        Search: searchGeralReducer,
        Produto: ProdutoSlice
    }
})

//Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
//Inferred type: {Search:SearchState,...}
export type AppDispatch = typeof store.dispatch