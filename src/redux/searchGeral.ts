import { createSlice } from "@reduxjs/toolkit";

export const searchGeral = createSlice({
    name: 'Search',
    initialState: {
        description: '',
        page: ''
    },
    reducers: {
        update: (state, action) => {
            state.description = action.payload.description;
            state.page = action.payload.page
        }
    }
})


export const { update } = searchGeral.actions;

export default searchGeral.reducer;