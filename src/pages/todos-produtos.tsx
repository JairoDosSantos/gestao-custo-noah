import Head from 'next/head'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';
import { FaFilePdf, FaEdit, FaTrash, FaPrint } from 'react-icons/fa'

import dynamic from 'next/dynamic';
import EditarProdutoModal from '../components/produto/ModalEditarProduto';
import { useDispatch } from 'react-redux';
import { deleteProduto, fetchAllProdutos } from '../redux/produtoSlice';
import { unwrapResult } from '@reduxjs/toolkit';



const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })


type PromiseDelete = {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean
}

type CategoryType = {
    descricao: string
}

//Tipagem do Produto
type ProddutoType = {
    id: number;
    descricao: string;
    nomeuser: string;
    //    unidade: string;
    //sub_category_id: CategoryType;
}


const TodosProdutos = () => {

    const router = useRouter()

    const [openModal, setOpenModal] = useState(false);
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)


    //estado do produto
    const [produtList, setProdutList] = useState<Array<ProddutoType>>([])

    //Estado para edição do Produto
    const [data, setData] = useState<ProddutoType>({} as ProddutoType)

    //Id do produto a ser deletado
    const [idP, setidP] = useState(0)

    const dispatch = useDispatch<any>();

    const fetchProduts = async () => {

        const produts = await dispatch(fetchAllProdutos());

        const allProducts = unwrapResult(produts)
        if (allProducts) {
            setProdutList(allProducts)
        }
    }

    const removeProduto = async (id: number) => {

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
            removeProduto(idP)
        }

    }


    useEffect(() => {
        fetchProduts()

    }, [openModal, showConfirmAlert])

    useEffect(() => {
        fetchProduts()

    }, [])


    const handleEditProduct = (id: number) => {
        const produtoFinded = produtList && produtList.find((product) => {
            return product.id === id
        })
        setData(produtoFinded as ProddutoType)


        setOpenModal(true)
    }

    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Lista de Produto</title>
            </Head>

            {/**Modal Edit */}
            <EditarProdutoModal isOpen={openModal} setIsOpen={setOpenModal} data={data} />

            {/**Confirm alert */}
            <SweetAlert2
                backdrop={true}
                show={showConfirmAlert}
                title='Sucesso'
                text='Operação efectuada com sucesso'
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
                backdrop={true}
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
                backdrop={true}
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
                <div className=' border-2 border-dashed rounded p-5 min-h-full animate__animated animate__fadeIn'>
                    <h3 className='font-bold text-2xl'>Relatório - Lista de produtos</h3>
                    <div className='flex gap-5 mt-3'>
                        <table className='min-w-full'>
                            <thead >
                                <tr className='border flex items-center justify-around mx-2 my-4 text-center p-2 shadow-sm rounded bg-gray-500'>
                                    <th className='w-1/6'>ID</th>
                                    <th className='w-1/6'>Descrição</th>
                                    <th className='w-1/6'>Cadastrador Por</th>
                                    <th className='w-1/6'>Editar</th>
                                    <th className='w-1/6'>Apagar</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (produtList && produtList.length > 0) ? (
                                        produtList.map((produto, index) => {
                                            if (index < 3) {
                                                return (
                                                    <tr
                                                        key={index}
                                                        className=' hover:cursor-pointer flex mx-3 items-center justify-around my-2 shadow rounded p-2 text-center'>

                                                        <td className='w-1/6 '>{produto.id}</td>
                                                        <td
                                                            onClick={() => router.push(`/produto-info/${produto.id}`)}
                                                            className='w-1/6 underline hover:text-gray-400'>{produto.descricao}</td>
                                                        <td className='w-1/6'>{produto.nomeuser}</td>
                                                        <td className='w-1/6 flex justify-center'>
                                                            <button
                                                                onClick={() => { handleEditProduct(produto.id) }}
                                                                className='flex  space-x-2 items-center btn rounded-full h-5 w-12'
                                                                title='Editar'
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                        </td>
                                                        <td className='w-1/6 text-center flex items-center justify-center'>
                                                            <button
                                                                onClick={() => { setShowQuestionAlert(true); setidP(produto.id) }}
                                                                className='flex space-x-2 items-center btn bg-gray-200 text-black rounded-full h-5 w-12'
                                                                title='Apagar'
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className='text-center'>Não existe produto na base de dados</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                    <div>


                        {
                            (produtList && produtList.length > 0) && (
                                <>
                                    <div className='flex justify-end gap-3'>
                                        <button className='btn flex space-x-2 items-center'>
                                            <FaPrint />
                                            <span>Imprimir</span>
                                        </button>
                                        <button className='btn bg-green-400 flex space-x-2 items-center'>
                                            <FaPrint />
                                            <span>Imprimir tudo</span>
                                        </button>
                                    </div>
                                    <div className='text-red-700 mt-2 text-center'>

                                        <p className='text-sm hidden'>Os campos com * o seu preenchimento é de carácter obrigatório.</p>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>

        </div >
    )
}

export default TodosProdutos
