import Head from 'next/head'
import { FaList, FaSave } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'

import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useDispatch } from 'react-redux'
import { update } from '../redux/searchGeral'
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })


import AutoCompletaProduto from '../components/AutoCompleteProduto'
import { insertProduto, insertProdutoFornecedor } from '../redux/produtoSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchFornecedores } from '../redux/fornecedorSlicee'
import { fetchSubcategorias } from '../redux/categoriaSlices'


import Image from 'next/image';

//Imagens
import LoadImage from '../assets/load.gif';
import { NextApiRequest } from 'next'
import { supabase } from '../utils/supabaseClient'


//Tipagem do formulário
type FormValues = {
    id: number;
    descricaoMaterial: string;
    precosimples: string;
    precotransporte: string;
    categoria: number;
    fornecedor_id: number;
    unidade: string;
    nomeuser: string
    produto_id: number
}

//Tipagem
type FornecedorType = {
    id: number;
    nome_fornecedor: string;
    telefone1: string;
    telefone2: string;
    tipo_fornecedor: string;
    endereco: string;
    nomeuser: string

}

//Tipagem SubCategoria
type SubCategoriaType = {
    id: number;
    descricao: string;
    categoria: number
}

const Produto = () => {

    const [idProduto, setIdProduto] = useState(0)
    //load
    const [load, setLoad] = useState(false)
    const router = useRouter()

    //estados para controlar os fornecedores
    const [idFornecedor, setFornecedor] = useState(0)
    const [backgoundColor1, setBackgroundColor1] = useState(false)
    const [backgoundColor2, setBackgroundColor2] = useState(false)
    const [backgoundColor3, setBackgroundColor3] = useState(false)

    //estado para o produto
    const [produto, setProduto] = useState('')

    //Estados dos sweetsAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    //fornecedores e categorias
    const [fornecedoresLista, setFornecedores] = useState<Array<FornecedorType>>([])
    const [categoriasLista, setSubCategorias] = useState<Array<SubCategoriaType>>([]);

    const dispatch = useDispatch<any>()
    const { description, page } = useSelector((state: RootState) => state.Search)

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoad(true)
        data.descricaoMaterial = produto;
        data.fornecedor_id = idFornecedor;
        data.nomeuser = 'Jairo dos Santos'

        if (idProduto === 0) {
            //Cadastrar primeiro o produto (porque não existe) depois cadastrar o produto do fornecedor com os seus preços, caso o produto não exista!
            const produtoInserted = await dispatch(insertProduto(data))
            setLoad(false)
            if (produtoInserted.payload) {
                data.produto_id = produtoInserted.payload.id
                const ProdutoFornecedor = await dispatch(insertProdutoFornecedor({
                    id: data.id,
                    categoria: data.categoria,
                    fornecedor_id: data.fornecedor_id,
                    nomeuser: data.nomeuser,
                    precosimples: data.precosimples,
                    produto_id: data.produto_id,
                    precotransporte: data.precotransporte,
                    unidade: data.unidade,
                    updated_at: (new Date()).toDateString()
                }));
                setLoad(false)
                if (ProdutoFornecedor.payload) {

                    setShowConfirmAlert(true)
                } else {

                    setShowErrorAlert(true)
                }

            } else {
                setLoad(false)
                setShowErrorAlert(true)

            }

            return

        } else {

            //Cadastrar o produto do fornecedor com os seus preços, caso o produto não exista!
            data.produto_id = idProduto;
            const ProdutoFornecedor = await dispatch(insertProdutoFornecedor(
                {
                    id: data.id,
                    categoria: data.categoria,
                    fornecedor_id: data.fornecedor_id,
                    nomeuser: data.nomeuser,
                    precosimples: data.precosimples,
                    produto_id: data.produto_id,
                    precotransporte: data.precotransporte,
                    unidade: data.unidade,
                    updated_at: (new Date()).toDateString()
                }
            ));
            setLoad(false)
            if (ProdutoFornecedor.payload) {
                setShowConfirmAlert(true)
            } else {
                setShowErrorAlert(true)
            }
            return
        }

    }

    async function fetchAllSubCategorias() {


        //setPending(true)
        const SubCategorias = await dispatch(fetchSubcategorias())
        const TodosSubCategorias = unwrapResult(SubCategorias)
        if (TodosSubCategorias) {

            setSubCategorias(TodosSubCategorias)
        }
        // setPending(false)

    }

    async function fetchAllFornecedores() {

        try {
            //setPending(true)
            const Fornecedores = await dispatch(fetchFornecedores())
            const TodosFornecedores = unwrapResult(Fornecedores)
            if (TodosFornecedores) {

                setFornecedores(TodosFornecedores)
            }
            // setPending(false)

        } catch (error) {
            //setPending(false)
            console.log(error)
        }

    }

    const searchFornecedor = () => {

        if (description) {
            const filteredFornecedor = fornecedoresLista.filter((fornecedor) => fornecedor.nome_fornecedor.toLowerCase().includes(description.toLowerCase()))
            setFornecedores(filteredFornecedor)
        } else {
            fetchAllFornecedores();
        }

    }

    useEffect(() => {
        searchFornecedor()
    }, [description])





    useEffect(() => {
        dispatch(update({ description, page: 'Fornecedor' }))
        fetchAllSubCategorias()
        fetchAllFornecedores()
    }, [])



    const isValidated = () => {
        if (isValid) {
            if (idFornecedor !== 0 && produto !== '') {
                return true
            }
            return false
        }
        return false
    }

    const handleSelectOne = (indice: number, id: number) => {
        if (indice === 0) {
            setFornecedor(id);
            setBackgroundColor1(true);
            setBackgroundColor2(false);
            setBackgroundColor3(false)
        } else if (indice === 1) {
            setFornecedor(id);
            setBackgroundColor2(true);
            setBackgroundColor1(false);
            setBackgroundColor3(false)
        } else if (indice === 2) {
            setFornecedor(id);
            setBackgroundColor3(true);
            setBackgroundColor1(false);
            setBackgroundColor2(false)
        }
    }


    return (
        <div className='-mt-20 p-5 flex flex-col sm:flex-row gap-3'>
            <Head>
                <title>Novo Produto</title>
            </Head>


            {/**Confirm alert**/}
            <SweetAlert2
                backdrop={true}
                show={showConfirmAlert}
                title='Sucesso'
                text='Novo produto criado com sucesso!'
                onConfirm={() => setShowConfirmAlert(false)}
                didClose={() => setShowConfirmAlert(false)}
                didDestroy={() => setShowConfirmAlert(false)}
                icon='success'
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                confirmButtonColor="#4051ef"
            />

            {/**Error Alert */}
            <SweetAlert2
                backdrop={true}
                show={showErrorAlert}
                title='Erro'
                text='Ocorreu um erro ao efectuar a operação!'
                icon='error'
                onConfirm={() => setShowErrorAlert(false)}
                didClose={() => setShowErrorAlert(false)}
                didDestroy={() => setShowErrorAlert(false)}
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                confirmButtonColor="#4051ef"
            />

            {/** Question Alert */}
            <SweetAlert2
                backdrop={true}
                show={showQuestionAlert}
                title='Atenção'
                text='Tem a certeza que deseja efectuar esta operação?'
                icon='question'
                onConfirm={() => setShowQuestionAlert(false)}
                didClose={() => setShowQuestionAlert(false)}
                didDestroy={() => setShowQuestionAlert(false)}
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                confirmButtonColor="#4051ef"
            />
            <div className='bg-white w-full  sm:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full animate__animated animate__fadeIn'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between'>
                            {/** Aquí virá um autocomplete component para descrição do material */}
                            <AutoCompletaProduto setProduto={setProduto} setIdProduto={setIdProduto} />
                        </div>
                        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between'>
                            <select
                                {...register('categoria')}
                                className='px-4 py-2 text-center border  rounded w-full lg:mx-2 lg:w-72  cursor-pointer shadow' >
                                <option className='text-left space-y-2' value="">... Sub-categoria ...</option>
                                {
                                    (categoriasLista && categoriasLista.length) ? (
                                        categoriasLista.map((Subcategoria, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={Subcategoria.id}>{Subcategoria.descricao}</option>
                                            )
                                        })
                                    ) : (
                                        <option value=""> Não existem subcategorias</option>
                                    )
                                }
                            </select>
                            <input
                                type="number"
                                placeholder='Preço com transporte'
                                className='px-4 py-2 border  rounded w-full mx-0 lg:mx-2 lg:w-72 shadow'
                                id='precoTransporte'
                                {...register('precotransporte', {
                                    min: { message: 'Por favor, insira um preço válido', value: 0 }
                                })} />
                        </div>
                        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0  items-center justify-between'>
                            <select
                                {...register('unidade')}
                                className='mt-4 px-4 text-center py-2 border rounded w-full lg:mx-2 lg:w-72 shadow cursor-pointer'>
                                <option className='text-left space-y-2' value="">... Unidade ...</option>
                                <option value="mm">mm</option>
                                <option value="cm">cm</option>
                                <option value="cm²">cm²</option>
                                <option value="cm³">cm³</option>
                                <option value="m">m</option>
                                <option value="m²">m²</option>
                                <option value="m³">m³</option>
                                <option value="caixa">caixa</option>
                                <option value="Peça">Peça</option>
                            </select>
                            <input
                                type="number"
                                placeholder='Preço Símples *'
                                className='px-4 py-2 border  rounded w-full lg:mx-2 lg:w-72 shadow'
                                id='precoSimples'
                                {...register('precosimples', {
                                    required: { message: "Por favor, introduza o preço do produto.", value: true },
                                    minLength: { message: "Preenchimento obrigatório!", value: 3 },
                                    min: { message: 'Por favor, insira um preço válido', value: 0 }
                                })} />
                        </div>
                        <div className='flex flex-col sm:flex-row justify-end gap-3 mt-4'>
                            <button type='button' onClick={() => router.push('/todos-produtos')}
                                className='btn bg-gray-200 text-black flex space-x-2 items-center shadow'>
                                <FaList />
                                <span>Lista de Produtos</span>
                            </button>
                            <button
                                type='submit'
                                disabled={!isValidated()}
                                className='btn flex justify-center align-center space-x-2 items-center shadow
                                 disabled:bg-blue-500 disabled:text-gray-300 disabled:cursor-not-allowed text-center'>
                                {
                                    load ? (
                                        <Image src={LoadImage} height={20} width={20} objectFit='cover' />
                                    ) : (

                                        <FaSave />
                                    )
                                }
                                <span>Salvar</span>
                            </button>
                        </div>
                        <div className='text-red-700 mt-2 text-center'>
                            <p className='text-sm '>Os campos com * o seu preenchimento é de carácter obrigatório.</p>
                            <p className='text-sm '> {errors.descricaoMaterial && (errors.descricaoMaterial.message)}</p>
                            <p className='text-sm '> {errors.precosimples && (errors.precosimples.message)}</p>
                        </div>
                    </form>
                </div>
            </div >
            <div className='bg-white  flex-1 p-5 rounded shadow-md max-h-96 overflow-hide-scroll-bar'>
                <div className='border-2 border-dashed rounded p-5 min-h-full animate__animated animate__fadeIn'>
                    <h3 className='text-center font-bold mb-4'>Lista de Fornecedores</h3>
                    <ul>
                        {
                            (fornecedoresLista && fornecedoresLista.length > 0) ? (
                                fornecedoresLista.map((fornecedor, index) => {
                                    if (index < 3) {
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectOne(index, fornecedor.id)}
                                                className={`my-2 cursor-pointer hover:bg-blue-600 hover:text-white 
                                                ${(index === 2 && backgoundColor3) ? 'selected-item' : ''} 
                                                ${(index === 1 && backgoundColor2) ? 'selected-item' : ''} 
                                                ${(index === 0 && backgoundColor1) ? 'selected-item' : ''}  
                                                rounded p-2`}>{fornecedor.nome_fornecedor} - <span className='text-gray-400 truncate'>{fornecedor.endereco}</span>
                                            </li>

                                        )
                                    }
                                })
                            ) : (
                                <li className='text-center'>Não existem fornecedores na base de dados.</li>
                            )
                        }

                    </ul>
                </div>
            </div>
        </div >
    )
}

export async function getServerSideProps(req: NextApiRequest) {

    const { user } = await supabase.auth.api.getUserByCookie(req)
    const session = supabase.auth.session()

    //console.log(session)
    //  const { user: UserAuth, session: S } = Auth.useUser()
    //console.log(UserAuth)
    if (session && !session.user) {
        // If no user, redirect to index.
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    // If there is a user, return it.
    return {
        props:
        {
            user
        }
    }
}

export default Produto
