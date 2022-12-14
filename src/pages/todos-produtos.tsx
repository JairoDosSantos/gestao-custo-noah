import Head from 'next/head'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPrint } from 'react-icons/fa'

import dynamic from 'next/dynamic';
import EditarProdutoModal from '../components/produto/ModalEditarProduto';
import { useDispatch } from 'react-redux';
import { deleteProduto, fetchAllProdutos } from '../redux/produtoSlice';
import { unwrapResult } from '@reduxjs/toolkit';


import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import nookies from 'nookies'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Pagination from '../components/Pagination';


import ReactPaginate from 'react-paginate';

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

    //Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 3;
    const offset = currentPage * PER_PAGE;
    let pageCount = 1;
    let currentFiltered: ProddutoType[] = []
    let currentPageData: ProddutoType[] = []

    const [openModal, setOpenModal] = useState(false);
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    const doc = new jsPDF();


    //estado do produto
    const [produtList, setProdutList] = useState<Array<ProddutoType>>([])

    //Estado para edição do Produto
    const [data, setData] = useState<ProddutoType>({} as ProddutoType)
    const { description } = useSelector((state: RootState) => state.Search)
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

    const fetechedProducts = description ? produtList.filter(produto => produto.descricao.toLowerCase().includes(description.toLowerCase())) : []


    if (fetechedProducts.length) {
        currentFiltered = fetechedProducts.slice(offset, offset + PER_PAGE)
        pageCount = Math.ceil(fetechedProducts.length / PER_PAGE);
        console.log(currentFiltered)
    } else {
        currentPageData = produtList
            .slice(offset, offset + PER_PAGE)

        pageCount = Math.ceil(produtList.length / PER_PAGE);
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

    const printTable = () => {

        autoTable(doc, { html: '#tabelaTodosProdutos', theme: 'grid', includeHiddenHtml: true, useCss: true })
        //doc.autoTable({ html: '#tabelaProdutos' })
        doc.save('Relatorio-Todos-Material.pdf')
    }

    useEffect(() => {
        fetchProduts()

    }, [openModal, showConfirmAlert])

    useEffect(() => {
        fetchProduts()

    }, [])

    const handleEditProduct = async (produto: ProddutoType) => {
        setData(produto)
        setOpenModal(true)
    }

    function handlePageClick({ selected: selectedPage }: any) {
        setCurrentPage(selectedPage);
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
                onConfirm={() => removeProduto(idP)}
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


            />
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar' >
                <div className=' border-2 border-dashed rounded p-5 min-h-full animate__animated animate__fadeIn'>
                    <h3 className='font-bold text-2xl'>Relatório - Lista de produtos</h3>
                    <div className='flex gap-5 mt-3'>
                        <table className='min-w-full' id='tabelaTodosProdutos'>
                            <thead >
                                <tr className='hidden'>
                                    <th colSpan={5} className='text-xl py-8 '>Lista de Produtos</th>
                                </tr>
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
                                    (description && fetechedProducts.length === 0) ? <></> : (produtList && produtList.length > 0 && fetechedProducts && fetechedProducts.length === 0) ?
                                        currentPageData?.map((produto, index) => {
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
                                                                onClick={() => { handleEditProduct(produto) }}
                                                                className='flex  justify-center space-x-2 items-center btn rounded-full h-10 w-10'
                                                                title='Editar'
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                        </td>
                                                        <td className='w-1/6 text-center flex items-center justify-center'>
                                                            <button
                                                                onClick={() => { setShowQuestionAlert(true); setidP(produto.id) }}
                                                                className='flex space-x-2 items-center justify-center btn bg-gray-200 text-black rounded-full h-10 w-10'
                                                                title='Apagar'
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
                                        : (currentFiltered?.map((produto, index) => {
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
                                                            onClick={() => { handleEditProduct(produto) }}
                                                            className='flex  space-x-2 items-center btn rounded-full h-10 w-10'
                                                            title='Editar'
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    </td>
                                                    <td className='w-1/6 text-center flex items-center justify-center'>
                                                        <button
                                                            onClick={() => { setShowQuestionAlert(true); setidP(produto.id) }}
                                                            className='flex space-x-2 items-center btn bg-gray-200 text-black rounded-full h-10 w-10'
                                                            title='Apagar'
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })

                                        )


                                }

                            </tbody>
                        </table>

                    </div>
                    <ReactPaginate
                        previousLabel={"←"}
                        nextLabel={"→"}
                        breakLabel={'...'}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}

                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                    />
                    {/**
                   *   <Pagination />
                   */}
                    <div>


                        {
                            (produtList && produtList.length > 0) && (
                                <>
                                    <div className='hidden justify-end gap-3'>
                                        <button onClick={printTable} className='btn flex space-x-2 items-center'>
                                            <FaPrint />
                                            <span>Imprimir</span>
                                        </button>
                                        <button className='btn hidden bg-green-400 space-x-2 items-center'>
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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {


    const cookie = nookies.get(context)

    if (!cookie.USER_LOGGED) {
        // If no user, redirect to index.
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    // If there is a user, return it.
    return {
        props:
        {
            cookie
        }
    }
}

export default TodosProdutos
