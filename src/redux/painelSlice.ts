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

export const fetchAllProdutosFornecedor = createAsyncThunk('/painel-controlo/produtos/Fornecedor', async () => {
    try {

        const { data, error } = await supabase
            .from('produtofornecedor')
            .select(`id,precotransporte,precosimples,unidade,nomeuser,produto_id(id,descricao),fornecedor_id(id,nome_fornecedor,telefone1,telefone2,endereco),sub_category_id(id,descricao),inserted_at,updated_at`)
            .order('precosimples', { ascending: true })
            .limit(3)
        if (data) {
            return data
        } else {
            return error
        }

    } catch (error) {
        return (error)
    }

})


export const fetchAllProdutosFornecedorActualizado = createAsyncThunk('/painel-controlo/produtos/Fornecedor/update', async () => {
    try {

        const { data, error } = await supabase
            .from('relationgrafico')
            .select(`id,precotransporte_antigo,precosimples_antigo,produtofornecedor_id(id,fornecedor_id,produto_id),inserted_at,updated_at`)
            .order('inserted_at', { ascending: false })
            .limit(3)
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