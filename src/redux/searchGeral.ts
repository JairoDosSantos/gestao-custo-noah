import { createSlice } from "@reduxjs/toolkit";

export const searchGeral = createSlice({
    name: 'Search',
    initialState: {
        description: '',
        page: '',
        userAuth: ''
    },
    reducers: {
        update: (state, action) => {
            state.description = action.payload.description;
            state.page = action.payload.page
        },
        updateUser: (state, action) => {
            state.userAuth = action.payload.userAuth
        }

    }
})


export const { update } = searchGeral.actions;

export default searchGeral.reducer;