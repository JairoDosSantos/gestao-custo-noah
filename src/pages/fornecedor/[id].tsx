import Head from 'next/head';
import Image from 'next/image';

import Perfil from '../../assets/user.png'

import EditarModal from '../../components/fornecedor/EditarModal';

import { useRouter } from 'next/router';

import { FaEdit, FaTrash, FaUser } from 'react-icons/fa'
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextApiRequest } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { deleteFornecedor, fetchFornecedores } from '../../redux/fornecedorSlicee';
import { unwrapResult } from '@reduxjs/toolkit';
import { store } from '../../redux/store';
import { fetchAllProdutosFornecedor } from '../../redux/produtoSlice';

const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

//Tipagem
type FornecedoresType = {
    id: number;
    nome_fornecedor: string;
    telefone1: number;
    telefone2: number;
    tipoFornecedor: string;
    endereco: string;
    nomeuser: string;
    tipo_fornecedor: string;
}

type ProdutoType = {
    id: number;
    descricao: string;
}


//Tipagem de ProdutoFornecedor
type ProdutoFornecedorType = {
    id: number;
    produto_id: ProdutoType;
    fornecedor_id: FornecedoresType;
    precosimples: string;
    precotransporte: string;
    nomeuser: string;
    categoria: number;
    unidade: string;
}

type FornecedorTyping = {
    fornecedo: FornecedoresType;
    produto: ProdutoFornecedorType[]
}

type PromiseDelete = {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean
}


const FornecedorInfo = ({ fornecedo, produto }: FornecedorTyping) => {

    const dispatch = useDispatch<any>()
    const route = useRouter();

    //Lista de fornecedores
    const [fornecedor, setFornecedor] = useState<FornecedoresType>({} as FornecedoresType)
    const [fornecedores, setFornecedores] = useState<Array<FornecedoresType>>([])
    const [produtosFornecidos, setProdutosFornecidos] = useState<Array<ProdutoFornecedorType>>([])

    //Modal
    const [showModal, setShowModal] = useState(false)

    //SweetAlert
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)


    const removeFornecedor = async (id: number) => {

        const fornecedorRemivido = await dispatch(deleteFornecedor(id))
        const removido = unwrapResult(fornecedorRemivido)
        if (removido) {
            setShowConfirmAlert(true)

        } else {
            setShowErrorAlert(true)
        }

    }

    const ConfirmedRemove = async (result: PromiseDelete) => {

        if (result.isConfirmed) {
            removeFornecedor(fornecedo.id)

            setTimeout(() => {
                route.push('/fornecedor')
            }, 5000)
        }

    }

    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Fornecedor {fornecedo?.nome_fornecedor}</title>
            </Head>
            {/**Modal para editar fornecedor */}
            <EditarModal data={fornecedo} isOpen={showModal} setIsOpen={setShowModal} />
            {/**Confirm alert**/}
            <SweetAlert2
                show={showConfirmAlert}
                title='Sucesso'
                text='Fornecedor eliminado do sistema com sucesso'
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
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded px-5 py-3 min-h-full overflow-y-auto'>
                    <h3 className='text-center font-bold text-xl'>INFORMAÇÕES DO FORNECEDOR - {fornecedo?.nome_fornecedor}</h3>
                    <div className='flex flex-col lg:flex-row gap-4 lg:justify-between justify-center mt-2 lg:mt-0 '>
                        <div className='flex flex-col space-y-4 order-2 lg:order-1'>
                            <div>
                                <label className='font-bold'>ID : </label><span>{fornecedo?.id}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Nome : </label><span>{fornecedo?.nome_fornecedor}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Telefone : </label><span>{fornecedo?.telefone1}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Telefone Alternativo: </label><span>{fornecedo?.telefone2}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Endereço : </label><span>{fornecedo?.endereco}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Tipo de Fornecedor : </label><span>{fornecedo?.tipo_fornecedor}</span>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Fornecedor de:</label>
                                <ul className='flex flex-col space-y-2 list-disc ml-8'>
                                    {produto.length > 0 && produto.map((product, index) => (
                                        <li key={index}>{product.produto_id.descricao} <span className='text-gray-400 text-xs'> -&nbsp; &nbsp; {product.precosimples} AKWZ/{product.unidade} sem transporte</span>
                                            <span className='text-gray-400 text-xs'> - &nbsp; &nbsp;{product.precotransporte} AKWZ/{product.unidade}  com transporte</span>
                                        </li>

                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center align-center  space-y-2 order-1 lg:order-2'>
                            <div className='flex justify-center align-center'>
                                <FaUser className='h-44  w-44 text-gray-200' />
                            </div>
                            <div className='flex gap-3 justify-center align-center'>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className='flex space-x-2 items-center btn shadow cursor-pointer'>
                                    <FaEdit />
                                    <span>Editar</span>
                                </button>
                                <button
                                    onClick={() => setShowQuestionAlert(true)}
                                    className='flex space-x-2 items-center btn shadow bg-gray-200 text-black'>
                                    <FaTrash />
                                    <span>Apagar</span>
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
        .from('fornecedor')
        .select('*')

    const paths = data ? data.map(fornecedor => ({ params: { id: JSON.stringify(fornecedor.id) } })) : { params: { id: '' } }

    return {
        paths,
        fallback: true
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {


    const { data } = await supabase
        .from('fornecedor')
        .select('*')
        .filter('id', 'eq', params?.id)
        .single()

    const datas = await supabase
        .from('produtofornecedor')
        .select('id,precotransporte,precosimples,unidade,nomeuser,produto_id(id,descricao),fornecedor_id,sub_category_id(id,descricao)')
        .filter('fornecedor_id', 'eq', params?.id)

    const produtos = datas.data

    return {
        props: {
            fornecedo: data,
            produto: produtos
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


export default FornecedorInfo