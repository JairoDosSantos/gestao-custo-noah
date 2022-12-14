import Image from 'next/image'
import Head from 'next/head'


//Imagens do Perfil do fornecedor
import Fornecedor from '../assets/user.png'
import Logo from '../assets/noah.png'

import { FaPrint } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import ModalEditarProdutoPorFornecedor from '../components/produto/ModalEditarProdutoPorFornecedor';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { update } from '../redux/searchGeral';
import { fetchAllProdutosFornecedor } from '../redux/produtoSlice';
import { unwrapResult } from '@reduxjs/toolkit';

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { GetServerSidePropsContext } from 'next';


import nookies from 'nookies'

import ReactPaginate from 'react-paginate';

type FornecedorType = {
    id: number;
    nome_fornecedor: string;
    telefone1: string;
    telefone2: string;
    tipo_fornecedor: string;
    endereco: string;
    nomeUser: string;

}
type ProdutoType = {
    id: number;
    descricao: string;
}

//Tipagem de ProdutoFornecedor
type ProdutoFornecedorType = {
    id: number;
    produto_id: ProdutoType;
    fornecedor_id: FornecedorType;
    precosimples: string;
    precotransporte: string;
    nomeuser: string;
    categoria: number;
    unidade: string;
}

type ModalType = {
    id: number;
    fornecedor_id: number
    produto_id: number;
    precosimples: string;
    precotransporte: string;
    nomeuser: string;
    categoria: number;
    unidade: string;
}


const ListaProdutos = () => {

    //Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 3;
    const offset = currentPage * PER_PAGE;
    let pageCount = 1;
    let currentFiltered: ProdutoFornecedorType[] = []
    let currentPageData: ProdutoFornecedorType[] = []


    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const [data, setData] = useState<ProdutoFornecedorType>({} as ProdutoFornecedorType);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [allProductsFornecedores, setAllProductsFornecedores] = useState<Array<ProdutoFornecedorType>>([])

    const [searchType, setSearchType] = useState('Produto')

    const { description, page } = useSelector((state: RootState) => state.Search)
    const dispatch = useDispatch<any>()

    const doc = new jsPDF('landscape');

    const getAllProducts = async () => {
        const prodctsFornecedores = await dispatch(fetchAllProdutosFornecedor());
        const AllProdutsFornecedores = unwrapResult(prodctsFornecedores);

        if (AllProdutsFornecedores) {
            setAllProductsFornecedores(AllProdutsFornecedores)
        }
    }


    let filteredProducts: ProdutoFornecedorType[] = []

    if (searchType === 'Produto') {
        filteredProducts = description ? allProductsFornecedores.filter((product) => product.produto_id.descricao.toLowerCase().includes(description.toLowerCase())) : []

    } else {
        filteredProducts = description ? allProductsFornecedores.filter((product) => product.fornecedor_id.nome_fornecedor.toLowerCase().includes(description.toLowerCase())) : []
    }



    if (filteredProducts.length) {
        currentFiltered = filteredProducts.slice(offset, offset + PER_PAGE)
        pageCount = Math.ceil(filteredProducts.length / PER_PAGE);

    } else {
        currentPageData = allProductsFornecedores
            .slice(offset, offset + PER_PAGE)

        pageCount = Math.ceil(allProductsFornecedores.length / PER_PAGE);
    }

    const printTable = () => {

        autoTable(doc, { html: '#tabelaProdutos', theme: 'grid', includeHiddenHtml: true, useCss: true })
        //doc.autoTable({ html: '#tabelaProdutos' })
        doc.save('Relatorio-Custo-Material.pdf')
    }

    useEffect(() => {

        dispatch(update({ description, page: 'Produto' }))
        getAllProducts();

    }, [])
    useEffect(() => {
        getAllProducts();

    }, [isOpenModal])


    const handleShowModal = (produto: ProdutoFornecedorType) => {

        setData(produto)
        setIsOpenModal(true)

    }

    function handlePageClick({ selected: selectedPage }: any) {
        setCurrentPage(selectedPage);
    }


    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Lista de Produto</title>
            </Head>

            <ModalEditarProdutoPorFornecedor isOpen={isOpenModal} setIsOpen={setIsOpenModal} data={data} />

            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar print:shadow-none'>
                <div className=' border-2 border-dashed print:border-0 rounded p-5 min-h-full animate__animated animate__fadeIn'>
                    <div className='flex justify-between'>
                        <h3 className='font-bold text-2xl'>{`RELATÓRIO - CUSTO DE MATERIAL - `} <span className='first-letter:uppercase'>{`${page === 'Produto' ? description : 'Todos'}`}</span></h3>
                        <div className='flex gap-3 print:invisible'>
                            <label
                                htmlFor="Fornecedor"
                                className='text-md font-bold cursor-pointer '
                                onClick={() => setSearchType('Fornecedor')}>
                                <input type={'radio'} id='Fornecedor' name='Searchtype' className='text-md font-bold cursor-pointer' />
                                &nbsp; Fornecedor
                            </label>
                            <label
                                htmlFor="Produto"
                                className='text-md font-bold cursor-pointer'
                                onClick={() => setSearchType('Produto')}>
                                <input type={'radio'} id='Produto' name='Searchtype' className='text-md font-bold cursor-pointer' />
                                &nbsp; Produto
                            </label>
                        </div>
                    </div>
                    <div className='flex gap-5 mt-3'>
                        <table className='min-w-full' id='tabelaProdutos'>
                            <thead>
                                <tr className='hidden'>
                                    <th colSpan={7} className='flex justify-between items-center p-8'>
                                        <span>
                                            RELATÓRIO DE CUSTO DE MATERIAL- {description}
                                        </span>
                                    </th>

                                </tr>
                                <tr
                                    className='flex items-center justify-around  mx-3 my-4 text-center border p-2 shadow-sm rounded bg-gray-500'>
                                    <th className=' w-1/6'>Descrição</th>
                                    <th className=' w-1/6'>Fornecedor</th>
                                    <th className=' w-1/6'>Telefone</th>
                                    <th className=' w-1/6'>Telefone 2</th>
                                    <th className=' w-1/6'>Endereço</th>
                                    <th className=' w-1/6'>Custo c/transporte</th>
                                    <th className=' w-1/6'>Custo s/transporte</th>
                                    <th className=' w-1/6'>Unidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (description && filteredProducts.length === 0) ? (<tr>
                                        <td colSpan={6} className='text-center'>Não existem cotações para este produto na sua base de dados.</td>
                                    </tr>) :
                                        (currentPageData && currentPageData.length > 0 && filteredProducts.length === 0) ? (
                                            currentPageData.map((products, index) => {
                                                if (index < 5) {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            onClick={() => handleShowModal(products)}
                                                            className=' hover:brightness-75 hover:cursor-pointer flex mx-3 items-center justify-around  my-2 shadow rounded p-2 border '>
                                                            <td className=' w-1/6 text-center'>{products.produto_id.descricao}</td>
                                                            <td className=' w-1/6 text-center'>{products.fornecedor_id.nome_fornecedor}</td>
                                                            <td className=' w-1/6 text-center'>{products.fornecedor_id.telefone1}</td>
                                                            <td className=' w-1/6 text-center'>{products.fornecedor_id.telefone2}</td>
                                                            <td className='  w-1/6 text-center'>{products.fornecedor_id.endereco}</td>
                                                            <td className=' w-1/6 text-center'>
                                                                {Number(products.precotransporte).toLocaleString('pt', {
                                                                    style: 'currency',
                                                                    currency: 'KWZ'
                                                                })}
                                                            </td>

                                                            <td className=' w-1/6 text-center'>
                                                                {Number(products.precosimples).toLocaleString('pt', {
                                                                    style: 'currency',
                                                                    currency: 'KWZ'
                                                                })}
                                                            </td>
                                                            <td className=' w-1/6 text-center'>{products.unidade}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        ) : currentFiltered?.map((products, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    onClick={() => handleShowModal(products)}
                                                    className=' hover:brightness-75 hover:cursor-pointer flex mx-3 items-center justify-around  my-2 shadow rounded p-2 border '>
                                                    <td className=' w-1/6 text-center'>{products.produto_id.descricao}</td>
                                                    <td className=' w-1/6 text-center'>{products.fornecedor_id.nome_fornecedor}</td>
                                                    <td className=' w-1/6 text-center'>{products.fornecedor_id.telefone1}</td>
                                                    <td className=' w-1/6 text-center'>{products.fornecedor_id.telefone2}</td>
                                                    <td className='  w-1/6 text-center'>{products.fornecedor_id.endereco}</td>
                                                    <td className=' w-1/6 text-center'>
                                                        {Number(products.precotransporte).toLocaleString('pt', {
                                                            style: 'currency',
                                                            currency: 'KWZ'
                                                        })}
                                                    </td>

                                                    <td className=' w-1/6 text-center'>
                                                        {Number(products.precosimples).toLocaleString('pt', {
                                                            style: 'currency',
                                                            currency: 'KWZ'
                                                        })}
                                                    </td>
                                                    <td className=' w-1/6 text-center'>{products.unidade}</td>
                                                </tr>
                                            )
                                        })
                                }

                            </tbody>
                            <tfoot className='hidden mt-5'>
                                <tr className='font-bold bg-white py-5'>

                                    <td colSpan={7} className='text-center p-8'>Luanda, aos {(new Date().getDate())} de {meses[(new Date().getMonth()) - 1]}.</td>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                    <div>
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
                        <div className='hidden print:justify-start justify-end mt-3'>
                            <div className='hidden print:inline-block'>
                                <h4><span className='font-bold'>Gerado por</span> : Jairo dos Santos</h4>
                            </div>
                            <div className='flex gap-3'>
                                <button onClick={printTable} className='btn flex space-x-2 items-center print:hidden shadow'>
                                    <FaPrint />
                                    <span>Imprimir</span>
                                </button>
                                <button onClick={() => print()} className='btn hidden bg-green-400  space-x-2 items-center print:hidden shadow'>
                                    <FaPrint />
                                    <span>Imprimir tudo</span>
                                </button>
                            </div>
                        </div>
                        <div className='text-red-700 mt-2 text-center'>

                            <p className='text-sm hidden'>Os campos com * o seu preenchimento é de carácter obrigatório.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const cookie = nookies.get(context)

    if (!cookie.USER_LOGGED) {
        // If no user, redirect to index.
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    //https://www.freecodecamp.org/news/the-complete-guide-to-full-stack-development-with-supabas/   doc-full stack supabase App with Nextjs
    //https://jitsu.com/blog/supabase-nextjs-middleware
    //https://github.com/vercel/next.js/blob/canary/examples/with-supabase-auth-realtime-db/pages/index.js
    //https://nextjs.org/docs/authentication

    // If there is a user, return it.
    return {
        props:
        {
            cookie
        }
    }
}

export default ListaProdutos
