import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../utils/supabaseClient";


type FornecedorType = {
    id: number;
    nome_fornecedor: string;
    telefone1: string;
    telefone2: string;
    tipo_fornecedor: string;
    endereco: string;
    nomeUser: string;

}
type FornecedoresArrayType = {
    data: Array<FornecedorType>
}

export const fetchFornecedores = createAsyncThunk('/fornecedor', async () => {
    try {
        const { data, error } = await supabase
            .from('fornecedor')
            .select(`*`).order('id', { ascending: false })
        return data;
    } catch (error) {
        return error
    }

})

export const findByNameFornecedor = createAsyncThunk('fornecedor/find', async (nome_fornecedor: string) => {
    try {

        const { data, error } = await supabase
            .from('fornecedor')
            .select('*')
            .filter('nome_fornecedor', 'eq', nome_fornecedor)
            .single()

        return data;

    } catch (error) {
        // console.log(error)
    }
})

export const insertFornecedor = createAsyncThunk('/fornecedor/criar', async ({ nome_fornecedor, telefone1, telefone2, tipo_fornecedor, endereco }: FornecedorType) => {
    try {

        const { data, error } = await supabase
            .from('fornecedor')
            .insert([
                { nome_fornecedor, telefone1, telefone2, tipo_fornecedor, endereco }
            ])
            .single()
        if (data) {

            return data
        }


    } catch (error) {
        return (error)
    }

})

export const updateFornecedor = createAsyncThunk('/fornecedor/update', async ({ id, nome_fornecedor, telefone1, telefone2, tipo_fornecedor, endereco }: FornecedorType) => {
    try {
        const { data, error } = await supabase
            .from('fornecedor')
            .update([
                { nome_fornecedor, telefone1, telefone2, tipo_fornecedor, endereco }
            ])
            .match({ id })

        return true

    } catch (error) {
        return (error)
    }
})

export const deleteFornecedor = createAsyncThunk('/fornecedor/delete', async (id: number) => {
    try {
        const { data, error } = await supabase
            .from('fornecedor')
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

interface FornecedoresState {
    fornecedores: Array<FornecedorType>
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    fornecedores: [],
    loading: 'idle',
} as FornecedoresState

export const fornecedoresSlice = createSlice({
    name: 'fornecedor',
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
        build.addCase(fetchFornecedores.fulfilled, (state, action) => {
            state.fornecedores.push(action.payload as FornecedorType)
        });
        build.addCase(insertFornecedor.fulfilled, (state, action) => {
            state.fornecedores.push(action.payload as FornecedorType)

        });
        build.addCase(findByNameFornecedor.fulfilled, (state, action) => {

        })
    },
})

//export const {update} =fornecedoresSlice.actions;
export default fornecedoresSlice.reducer;