import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../utils/supabaseClient";


type categoriaType = {
    id: number;
    categoria: string;
}

type subCategoriaType = {
    id: number;
    categoria: number;
    subCategoria: string
}
type CategoriasArrayType = {
    data: Array<categoriaType>
}

export const insertCategoria = createAsyncThunk('categoria/criar', async ({ categoria }: categoriaType) => {
    try {

        const { data, error } = await supabase
            .from('categoria')
            .insert([
                { descricao: categoria }
            ])
            .single()
        if (data) {

            return data
        }

    } catch (error) {
        return error
    }
})

export const fetchcategorias = createAsyncThunk('/categoria', async () => {
    try {
        const { data, error } = await supabase
            .from('categoria')
            .select(`*`).order('id', { ascending: false })
        return data;
    } catch (error) {
        return error
    }

})


export const fetchSubcategorias = createAsyncThunk('/Subcategorias', async () => {
    try {
        const { data, error } = await supabase
            .from('subcategoria')
            .select(`*`).order('id', { ascending: false })
        return data;
    } catch (error) {
        return error
    }

})


export const insertSubcategoria = createAsyncThunk('/subCategoria/criar', async ({ categoria, subCategoria }: subCategoriaType) => {
    try {

        const { data, error } = await supabase
            .from('subcategoria')
            .insert([
                { category_id: categoria, descricao: subCategoria }
            ])
            .single()
        if (data) {

            return data
        }


    } catch (error) {
        return (error)
    }

})

export const updateCategorias = createAsyncThunk('/categoria/update', async ({ id, categoria }: categoriaType) => {
    try {

        const { data, error } = await supabase
            .from('categoria')
            .update([
                { descricao: categoria }
            ])
            .match({ id })

        return data

    } catch (error) {
        return (error)
    }
})

export const deleteCategoria = createAsyncThunk('/categoria/delete', async (id: number) => {
    try {

        const { data, error } = await supabase
            .from('categoria')
            .delete()
            .match({ id })

        return true

    } catch (error) {

        return error
    }
})


/**
 * : {
        fornecedores: [],
        pending: false,
        error: false
    }
 */

interface categoriaState {
    categorias: Array<categoriaType>,
    subcategorias: Array<subCategoriaType>,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    categorias: [],
    subcategorias: [],
    loading: 'idle',
} as categoriaState

export const categoriaesSlice = createSlice({
    name: 'categoria',
    initialState,
    reducers: {
        /**
         *   update:(state,action)=>{
              state.name=action.payload.name;
              state.email=action.payload.email;
          }
         */
    },
    extraReducers: (build) => {
        build.addCase(fetchcategorias.fulfilled, (state, action) => {
            state.categorias.push(action.payload as categoriaType)
        });
        build.addCase(fetchSubcategorias.fulfilled, (state, action) => {
            state.subcategorias.push(action.payload as subCategoriaType)
        });
        build.addCase(insertCategoria.fulfilled, (state, action) => {
            state.categorias.push(action.payload as categoriaType)
        });

        build.addCase(insertSubcategoria.fulfilled, (state, action) => {

        });

    },
})

//export const {update} =categoriaesSlice.actions;
export default categoriaesSlice.reducer;