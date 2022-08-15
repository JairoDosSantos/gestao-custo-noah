import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../utils/supabaseClient";


//Tipagem do Produto
type ProdutoType = {
    id: number;
    descricaoMaterial: string;
    nomeuser: string;
}

//Tipagem de ProdutoFornecedor
type ProdutoFornecedorType = {
    id: number;
    produto_id: number;
    fornecedor_id: number;
    precosimples: string;
    precotransporte: string;
    nomeuser: string;
    categoria: number;
    unidade: string;
}

export const fetchAllProdutos = createAsyncThunk('/produtos', async () => {
    try {

        const { data, error } = await supabase
            .from('produto')
            .select(`id,descricao,nomeuser`).order('id', { ascending: false })

        if (data) {
            return data
        }


    } catch (error) {
        return (error)
    }

})

export const fetchAllProdutosFornecedor = createAsyncThunk('/produtos/Fornecedor', async () => {
    try {

        const { data, error } = await supabase
            .from('produtofornecedor')
            .select(`id,precotransporte,precosimples,unidade,nomeuser,produto_id(id,descricao),fornecedor_id(id,nome_fornecedor,telefone1,telefone2,endereco),sub_category_id(id,descricao)`).order('precosimples', { ascending: true })

        if (data) {
            return data
        }


    } catch (error) {
        return (error)
    }

})

export const insertProduto = createAsyncThunk('/produto/criar', async ({ descricaoMaterial, nomeuser }: ProdutoType) => {
    try {

        const { data, error } = await supabase
            .from('produto')
            .insert([
                { descricao: descricaoMaterial, nomeuser }
            ])
            .single()
        if (data) {

            return data
        }


    } catch (error) {
        return (error)
    }

})

export const insertProdutoFornecedor = createAsyncThunk('/produto/fornecedor/criar', async ({ produto_id, fornecedor_id, precosimples, precotransporte, nomeuser, categoria, unidade }: ProdutoFornecedorType) => {
    try {

        const { data, error } = await supabase
            .from('produtofornecedor')
            .insert([
                { produto_id, fornecedor_id, precosimples, precotransporte, nomeuser, sub_category_id: categoria, unidade }
            ])
            .single()
        if (data) {

            return data
        }


    } catch (error) {
        return (error)
    }

})

export const updatePrecoFornecedor = createAsyncThunk('/preco/update', async ({ id, produto_id, fornecedor_id, precosimples, precotransporte, nomeuser, categoria, unidade }: ProdutoFornecedorType) => {
    try {
        const { data, error } = await supabase
            .from('produtofornecedor')
            .update([
                { produto_id, fornecedor_id, precosimples, precotransporte, nomeuser, sub_category_id: categoria, unidade }
            ])
            .match({ id })

        return data
    } catch (error) {
        return (error)
    }
})

export const updateProduto = createAsyncThunk('/produto/update', async ({ id, nomeuser, descricaoMaterial }: ProdutoType) => {
    try {
        const { data, error } = await supabase
            .from('produto')
            .update([
                { nomeuser, descricao: descricaoMaterial }
            ])
            .match({ id })

        return true
    } catch (error) {
        return (error)
    }
})

export const deleteProduto = createAsyncThunk('/produto/delete', async (id: number) => {
    try {

        const { data, error } = await supabase
            .from('produto')
            .delete()
            .match({ id })

        return true

    } catch (error) {

        return error
    }
})

export const deleteProdutoFornecedor = createAsyncThunk('/produto-fornecedor/delete', async (id: number) => {
    try {

        const { data, error } = await supabase
            .from('produtofornecedor')
            .delete()
            .match({ id })

        return true

    } catch (error) {

        return error
    }
})


interface produtoState {
    produtos: Array<ProdutoType>
    produtosfornecedores: Array<ProdutoFornecedorType>
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    produtos: [],
    produtosfornecedores: [],
    loading: 'idle',
} as produtoState


export const produtoSlice = createSlice({
    name: 'Produto',
    initialState,
    reducers: {
        /**
         *  update: (state, action) => {
             state.id = action.payload.id;
             state.description = action.payload.description;
             state.unidade = action.payload.unidade;
         }
         */
    },
    extraReducers: (build) => {
        build.addCase(fetchAllProdutos.fulfilled, (state, action) => {
            state.produtos.push(action.payload as ProdutoType)
        });
        build.addCase(insertProduto.fulfilled, (state, action) => {
            state.produtos.push(action.payload as ProdutoType)
        });
        build.addCase(insertProdutoFornecedor.fulfilled, (state, action) => {
            state.produtosfornecedores.push(action.payload as ProdutoFornecedorType)
        });
        build.addCase(updatePrecoFornecedor.fulfilled, (state, action) => {

        })



    },
})


//export const { update } = produtoSlice.actions;

export default produtoSlice.reducer;