import { createSlice } from "@reduxjs/toolkit";

export const produtoSlice = createSlice({
    name: 'Produto',
    initialState: {
        id: '',
        description: '',
        unidade: ''
    },
    reducers: {
        update: (state, action) => {
            state.id = action.payload.id;
            state.description = action.payload.description;
            state.unidade = action.payload.unidade;
        }
    }
})


export const { update } = produtoSlice.actions;

export default produtoSlice.reducer;