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
    inserted_at: string;
    updated_at: string;
}
//Tipagem de relatorio Gráfico
type RelatorioProdutoType = {
    produtofornecedor_id: number;
    precosimples_antigo: string;
    precotransporte_antigo: string
}
type RelatorioProdutoTypeRefactored = {

    produto_id: number;
    fornecedor_id: number;
    precosimples_antigo: string;

}
type RelatorioProdutoTypeRefactored2 = {

    produto_id: number;
    fornecedor_id: number;

}

export const fetchAllProdutosFornecedor = createAsyncThunk('/painel-controlo/produtos/Fornecedor', async () => {
    try {

        const { data, error } = await supabase
            .from('produtofornecedor')
            .select(`id,precotransporte,precosimples,unidade,nomeuser,produto_id(id,descricao),fornecedor_id(id,nome_fornecedor,telefone1,telefone2,endereco),sub_category_id(id,descricao),inserted_at,updated_at`)
            .order('precosimples', { ascending: true })
        if (data) {
            return data
        } else {
            return error
        }

    } catch (error) {
        return (error)
    }

})


export const fetchAllProdutosFornecedorActualizado = createAsyncThunk('/painel-controlo/produtos/Fornecedor/update', async ({ fornecedor_id, produto_id }: RelatorioProdutoTypeRefactored2) => {
    try {
        //'*, users!inner(*)'  id,precotransporte_antigo,precosimples_antigo,produtofornecedor_id(id,fornecedor_id(id,nome_fornecedor),produto_id(id,descricao)),inserted_at,updated_at
        const { data, error } = await supabase
            .from('relationgrafico')
            .select(`inserted_at,precosimples_antigo,produtofornecedor_id(id,produto_id,fornecedor_id)!inner(*)`)
            .eq('produtofornecedor_id.produto_id', 2)
            .eq('produtofornecedor_id.fornecedor_id', 3)
            .order('inserted_at', { ascending: true })
            .limit(5)

        if (data) {
            return data
        } else {
            return error
        }

    } catch (error) {
        return (error)
    }

})

export const fetchAllProdutosFornecedorActualizadoRefatored = createAsyncThunk('/painel-controlo/produtos/Fornecedor/update2', async ({ fornecedor_id, produto_id }: RelatorioProdutoTypeRefactored2) => {
    try {
        //'*, users!inner(*)'  id,precotransporte_antigo,precosimples_antigo,produtofornecedor_id(id,fornecedor_id(id,nome_fornecedor),produto_id(id,descricao)),inserted_at,updated_at
        const { data, error } = await supabase
            .from('relatorio')
            .select(`created_at,precosimples_antigo,id,produto_id(id,descricao),fornecedor_id(id,nome_fornecedor)`)
            .match({ fornecedor_id, produto_id })
            .order('created_at', { ascending: false })
            .limit(5)

        if (data) {
            return data
        } else {
            return error
        }

    } catch (error) {
        return (error)
    }

})

export const insertUpdatePreco = createAsyncThunk('/painel-controlo/produtos/Fornecedor', async ({ precotransporte_antigo, precosimples_antigo, produtofornecedor_id }: RelatorioProdutoType) => {
    try {

        const { data, error } = await supabase
            .from('relationgrafico')
            .insert([{ precotransporte_antigo, precosimples_antigo, produtofornecedor_id }])
            .single()

        if (data) {
            return data
        } else {
            return error
        }

    } catch (error) {
        return (error)
    }

})

export const insertUpdatePrecoRefactored = createAsyncThunk('/painel-controlo/produtos/Fornecedores', async ({ precosimples_antigo, fornecedor_id, produto_id }: RelatorioProdutoTypeRefactored) => {
    try {

        const { data, error } = await supabase
            .from('relatorio')
            .insert([{ precosimples_antigo, fornecedor_id, produto_id }])
            .single()

        if (data) {
            return data
        } else {
            return error
        }

    } catch (error) {
        return (error)
    }

})

interface produtoState {
    produtosfornecedores: Array<ProdutoFornecedorType>
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    produtosfornecedores: [],
    loading: 'idle',
} as produtoState


export const painelControlo = createSlice({
    name: 'Painel',
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
        build.addCase(fetchAllProdutosFornecedor.fulfilled, (state, action) => {
            state.produtosfornecedores.push(action.payload as ProdutoFornecedorType)
        });

    },
})

export default painelControlo.reducer;