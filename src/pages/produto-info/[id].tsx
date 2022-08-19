import Head from 'next/head'


import { useRouter } from 'next/router';
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import EditarProdutoModal from '../../components/produto/ModalEditarProduto';
import { GetStaticProps, NextApiRequest } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { deleteProduto } from '../../redux/produtoSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

//Tipagem do Produto
type ProddutoType = {
    id: number;
    descricao: string;
    nomeuser: string;
    updated_at: string
    created_at: string
}
type FornecedoresType = {
    id: number;
    fornecedor_id: FornecedorType;
    tipoFornecedor: string;
    endereco: number;
    precosimples: number;
    precotransporte: number;
    unidade: string
    sub_category_id: CategoryType
}
type FornecedorType = {
    id: number;
    nome_fornecedor: string;
    tipoFornecedor: string;
    endereco: number;
    telefone1: number;
    telefone2: number;
}

type CategoryType = {
    id: number;
    descricao: string;

}

type PropsType = {
    produto: ProddutoType;
    fornecedores: FornecedoresType[]
}

type PromiseDelete = {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean
}

const InfoProduto = ({ produto, fornecedores }: PropsType) => {



    const { query } = useRouter();
    const { id } = query

    //Estados do Modal de Edição
    const [openModal, setOpenModal] = useState(false);

    //Estados dos sweetAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    const dispatch = useDispatch<any>()
    const route = useRouter()
    const removeFornecedor = async (id: number) => {

        const produtoRemovido = await dispatch(deleteProduto(id))
        const removido = unwrapResult(produtoRemovido)
        if (removido) {
            setShowConfirmAlert(true)

        } else {
            setShowErrorAlert(true)
        }

    }

    const ConfirmedRemove = async (result: PromiseDelete) => {

        if (result.isConfirmed) {
            removeFornecedor(produto.id)

            setTimeout(() => {
                route.push('/todos-produtos')
            }, 5000)
        }

    }



    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Informação sobre o Produto {id}</title>
            </Head>

            {/** Edit Modal */}
            <EditarProdutoModal data={produto} isOpen={openModal} setIsOpen={setOpenModal} />

            {/**Confirm Alert */}
            <SweetAlert2
                show={showConfirmAlert}
                title='Sucesso'
                text='Produto eliminado do sistema com sucesso'
                onConfirm={() => setShowConfirmAlert(false)}
                didClose={() => setShowConfirmAlert(false)}
                didDestroy={() => setShowConfirmAlert(false)}
                icon='success'
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                showLoaderOnConfirm={true}
                confirmButtonColor="#4051ef"
            />

            {/**Error Alert */}
            <SweetAlert2
                show={showErrorAlert}
                title='Erro'
                text='Ocorreu um erro ao efectuar a operação'
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
                show={showQuestionAlert}
                title='Atenção'
                text='Tem a certeza que deseja efectuar esta operação ?'
                icon='question'
                onConfirm={() => setShowQuestionAlert(false)}
                didClose={() => setShowQuestionAlert(false)}
                didDestroy={() => setShowQuestionAlert(false)}
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                showCancelButton={true}
                cancelButtonText='Cancelar'
                confirmButtonColor="#4051ef"
                confirmButtonText="Sim"
                onResolve={ConfirmedRemove}

            />
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-y-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded px-5 py-3 min-h-full '>
                    <h3 className='text-center font-bold text-xl'>INFORMAÇÕES DO PRODUTO {id}</h3>
                    <div className='flex flex-col lg:flex-row gap-4 lg:justify-between lg:mt-0 mt-2'>
                        <div className='flex flex-col  space-y-4'>
                            <div>
                                <label className='font-bold'>Nome : </label><span>{produto?.descricao}</span>
                            </div>
                            {
                                /**
                                 * <div>
                                        <label className='font-bold'>Menor Preço símples : </label><span>{produto?.}/span>
                                    </div>
                                    <div>
                                        <label className='font-bold'>Menor Preço C/transporte : </label><span>1.500,00 AKWZ</span>
                                    </div>
                                 */
                            }
                            <div>
                                <label className='font-bold'>Cadastrado por : </label><span>{produto?.nomeuser}</span>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Categoria a que pertence:</label>
                                <ul className='flex flex-col gap-3 mt-1 list-disc ml-8'>
                                    {
                                        fornecedores && fornecedores.map((fornecedor, index) => (
                                            <li key={index}>
                                                {fornecedor.sub_category_id.descricao}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Fornecedores:</label>
                                <ul className='flex flex-col gap-3 mt-1 list-disc ml-8'>
                                    {
                                        fornecedores && fornecedores.map((fornecedor, index) => (
                                            <li key={index}>{fornecedor.fornecedor_id.nome_fornecedor}
                                                <span className='text-gray-400 text-xs'>- {fornecedor.precosimples.toLocaleString('pt', {
                                                    style: 'currency',
                                                    currency: 'KWZ'
                                                })}/{fornecedor.unidade} sem transporte- {fornecedor.precotransporte.toLocaleString('pt', {
                                                    style: 'currency',
                                                    currency: 'KWZ'
                                                })}/{fornecedor.unidade} -  {fornecedor.fornecedor_id.telefone1} - {fornecedor.fornecedor_id.telefone2}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col align-top  space-y-2'>

                            <div className='flex flex-wrap  gap-3'>
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className='flex space-x-2 items-center btn order-1'
                                >
                                    <FaEdit /> <span>Editar</span>
                                </button>
                                <button className='btn bg-green-400 flex space-x-2 items-center order-3 lg:order-2'>
                                    <FaPrint />
                                    <span>Imprimir</span>
                                </button>
                                <button
                                    onClick={() => setShowQuestionAlert(true)}
                                    className='flex space-x-2 items-center btn bg-gray-200 text-black order-2 lg:order-3 '>
                                    <FaTrash /> <span>Apagar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}



export const getStaticPaths = async () => {



    const { data, error } = await supabase
        .from('produto')
        .select('*')

    const paths = data ? data.map(produto => ({ params: { id: JSON.stringify(produto.id) } })) : { params: { id: '' } }

    return {
        paths,
        fallback: true
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {


    const { data } = await supabase
        .from('produto')
        .select('*')
        .filter('id', 'eq', params?.id)
        .single()

    const datas = await supabase
        .from('produtofornecedor')
        .select('id,precotransporte,precosimples,unidade,nomeuser,produto_id,fornecedor_id(id,nome_fornecedor,telefone1,telefone2,endereco),sub_category_id(id,descricao)')
        .filter('produto_id', 'eq', params?.id)

    const fornecedores = datas.data

    return {
        props: {
            produto: data,
            fornecedores: fornecedores
        }
    }
}


/**
 * export async function getServerSideProps(req: NextApiRequest) {

    const { user } = await supabase.auth.api.getUserByCookie(req)

    const session = supabase.auth.session()

    //console.log(session)
    //  const { user: UserAuth, session: S } = Auth.useUser()
    //console.log(UserAuth)
    if (user) {
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
 */

export default InfoProduto
