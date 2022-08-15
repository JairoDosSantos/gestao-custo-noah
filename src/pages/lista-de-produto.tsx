import Image from 'next/image'
import Head from 'next/head'


//Imagens do Perfil do fornecedor
import Fornecedor from '../assets/user.png'

import { FaPrint } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import ModalEditarProdutoPorFornecedor from '../components/produto/ModalEditarProdutoPorFornecedor';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { update } from '../redux/searchGeral';
import { fetchAllProdutosFornecedor } from '../redux/produtoSlice';
import { unwrapResult } from '@reduxjs/toolkit';


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

    const [data, setData] = useState({} as ModalType);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [allProductsFornecedores, setAllProductsFornecedores] = useState<Array<ProdutoFornecedorType>>([])

    const [searchType, setSearchType] = useState('Produto')

    const { description, page } = useSelector((state: RootState) => state.Search)
    const dispatch = useDispatch<any>()

    const getAllProducts = async () => {
        const prodctsFornecedores = await dispatch(fetchAllProdutosFornecedor());
        const AllProdutsFornecedores = unwrapResult(prodctsFornecedores);

        if (AllProdutsFornecedores) {
            setAllProductsFornecedores(AllProdutsFornecedores)
        }
    }

    const searchProductByDescriptioAndFornecedor = () => {

        if (description) {
            if (searchType === 'Produto') {
                const filteredProducts = allProductsFornecedores.filter((product) => product.produto_id.descricao.toLowerCase().includes(description.toLowerCase()))
                setAllProductsFornecedores(filteredProducts)
            } else {
                const filteredFornecedor = allProductsFornecedores.filter((product) => product.fornecedor_id.nome_fornecedor.toLowerCase().includes(description.toLowerCase()))
                setAllProductsFornecedores(filteredFornecedor)
            }
        } else {

            getAllProducts();
        }

    }

    useEffect(() => {

        dispatch(update({ description, page: 'Produto' }))
        getAllProducts();

    }, [])
    useEffect(() => {
        getAllProducts();

    }, [isOpenModal])

    useEffect(() => {

        searchProductByDescriptioAndFornecedor()

    }, [description, searchType])


    const handleShowModal = (id: number) => {
        const produtoFinded = allProductsFornecedores && allProductsFornecedores.find((product) => {
            return product.id === id
        })

        if (produtoFinded) {
            setData(
                {
                    id: produtoFinded.id,
                    fornecedor_id: produtoFinded.fornecedor_id.id,
                    produto_id: produtoFinded.produto_id.id,
                    nomeuser: produtoFinded.nomeuser,
                    precotransporte: produtoFinded.precotransporte,
                    precosimples: produtoFinded.precosimples,
                    categoria: produtoFinded.categoria,
                    unidade: produtoFinded.unidade
                })
            setIsOpenModal(true)
        }

    }
    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Lista de Produto</title>
            </Head>

            <ModalEditarProdutoPorFornecedor isOpen={isOpenModal} setIsOpen={setIsOpenModal} data={data} setData={setData} />

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
                        <table className='min-w-full'>
                            <thead>
                                <tr
                                    className='flex items-center justify-around  mx-3 my-4 text-center border p-2 shadow-sm rounded bg-gray-500'>
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
                                    (allProductsFornecedores && allProductsFornecedores.length > 0) ? (
                                        allProductsFornecedores.map((products, index) => {
                                            if (index < 5) {
                                                return (
                                                    <tr
                                                        key={index}
                                                        onClick={() => handleShowModal(products.id)}
                                                        className=' hover:brightness-75 hover:cursor-pointer flex mx-3 items-center justify-around  my-2 shadow rounded p-2 border '>
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
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className='text-center'>Não existem produtos de fornecedors na sua base de dados.</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                    <div>

                        <div className='flex print:justify-start justify-end mt-3'>
                            <div className='hidden print:inline-block'>
                                <h4><span className='font-bold'>Gerado por</span> : Jairo dos Santos</h4>
                            </div>
                            <div className='flex gap-3'>
                                <button onClick={() => print()} className='btn flex space-x-2 items-center print:hidden shadow'>
                                    <FaPrint />
                                    <span>Imprimir</span>
                                </button>
                                <button onClick={() => print()} className='btn bg-green-400 flex space-x-2 items-center print:hidden shadow'>
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

export default ListaProdutos
