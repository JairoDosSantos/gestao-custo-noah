import Head from 'next/head'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaUsers } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchAllProdutosFornecedor } from '../redux/painelSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';

//External Components
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })


//Tipagem do Produto
type ProdutoType = {
    id: number;
    descricaoMaterial: string;
    nomeuser: string;
}

//Tipagem do Fornecedor
type FornecedorType = {
    id: number;
    nome_fornecedor: string;
    endereco: string;
}

//Tipagem de ProdutoFornecedor
type ProdutoFornecedorType = {
    id: number;
    produto_id: ProdutoType[];
    fornecedor_id: FornecedorType;
    precosimples: number;
    precotransporte: number;
    nomeuser: string;
    categoria: number;
    unidade: string;
    inserted_at: string;
    updated_at: string;
}

const Home = () => {

    //Buscar do redux
    const { description, page } = useSelector((state: RootState) => state.Search)
    const dispatch = useDispatch<any>();

    //Objecto Produto-Fornecedor
    const [produtosFornecedores, setProdutosFornecedores] = useState<Array<ProdutoFornecedorType>>([])

    const [optionsChart, setOptionsChart] = useState({
        options: {
            chart: {
                height: 200,
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            stroke: {
                width: 3
            },
            colors: ['#606eda', '#bde857', '#546E7A'],
            toolbar: {
                autoSelected: "pan",
                show: false
            }
        },
        tooltip: {
            theme: 'dark'
        },
        series: [
            {
                name: "Fornecedor A",
                data: [31, 50, 80, 10, 100]
            },
            {
                name: "Fornecedor B",
                data: [1, 40, 16, 10, 9]
            },
            {
                name: "Fornecedor C",
                data: [100, 33, 24, 8, 19]
            }
        ],
        xaxis: {
            type: [10, 20, 30, 40, 60]
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        }
        ,
        legend: {
            position: 'bottom',
            horizontalAlign: "center",
        }
    })


    //Método que busca todos os produtos no banco dedados pelo reduxToolkit
    const getAllProductsByFornecedor = async () => {
        const datas = await dispatch(fetchAllProdutosFornecedor());
        const dataUnwrap = unwrapResult(datas);

        if (dataUnwrap) {
            setProdutosFornecedores(dataUnwrap)
        }

    }

    //Método que busca todos os produtos não actaulizado há um mês atrás
    const searchAllProductsNotActualizedOneMonthAgo = () => {

    }

    useEffect(() => {
        getAllProductsByFornecedor()

        //setOptionsChart({ ...optionsChart, series: produtosFornecedores })
    }, [])

    return (
        <div className='-mt-24 px-5 py-4 flex gap-3 overflow-hide-scroll-bar'>
            <Head>
                <title>Painel de controlo</title>
            </Head>
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-[30rem] overflow-auto overflow-hide-scroll-bar print:shadow-none'>
                <div className=' border-2 border-dashed rounded px-5 min-h-full text-center print:border-0 animate__animated animate__fadeIn'>
                    <div className='flex justify-between items-center w-[720px] p-2'>

                        <h1 className='text-2xl font-bold'>{`PAINEL DE CONTROLO  ${page === 'Produto' ? '- ' + description : ''}`}</h1>
                    </div>
                    <div className='flex gap-6 flex-wrap items-center justify-center mb-4 mt-2'>

                        <div className='border shadow rounded bg-white  p-3 order-2'>
                            {/** Gráfico de Preço vs Data */}
                            <h4 className='text-center font-bold'>Gráfico de Custos</h4>
                            <Chart
                                options={optionsChart.options}
                                series={optionsChart.series}
                                type="area"
                                width={400}

                            />
                        </div>
                        <div className='border shadow rounded bg-white py-5 px-3 w-[35rem] h-[19rem] flex flex-col print:shadow-none print:border-0 order-1'>
                            {/** Gráfico à anunciar */}
                            {/**
                            *  <div className='flex justify-start'>
                                    <input type="date" className='rounded border px-2 cursor-pointer' />
                                </div>
                            */}
                            <div>
                                <table className='p-2 flex flex-col gap-2'>
                                    <thead className=''>
                                        <tr className=' p-2 my-2 flex gap-10 text-center border shadow-sm rounded bg-gray-500'>

                                            <th className='w-1/5 text-center'>Nome do fornecedor</th>
                                            <th className='w-1/5 text-center'>Data actualização recente</th>
                                            <th className='w-1/5 text-center'>preço s/transporte</th>
                                            <th className='w-1/5 text-center'>preço c/transporte</th>
                                            <th className='w-1/5 text-center'>Preço Médio</th>
                                        </tr>
                                    </thead>
                                    <tbody className='flex flex-col gap-2'>
                                        {
                                            produtosFornecedores.length > 0 ? produtosFornecedores.map((pdtFornecedor, index) => {

                                                return (
                                                    <tr key={index} className='flex shadow rounded p-1'>
                                                        <td className='w-1/5 flex justify-center items-center truncate'>{pdtFornecedor.fornecedor_id.nome_fornecedor}</td>
                                                        <td className='w-1/5 flex justify-center items-center truncate'>{moment(pdtFornecedor.updated_at).format('L')}</td>
                                                        <td className='w-1/5 flex justify-center items-center truncate'>{pdtFornecedor.precosimples.toLocaleString('pt', {
                                                            style: 'currency',
                                                            currency: 'KWZ'
                                                        })}</td>
                                                        <td className='w-1/5 flex justify-center items-center truncate'>{pdtFornecedor.precotransporte.toLocaleString('pt', {
                                                            style: 'currency',
                                                            currency: 'KWZ'
                                                        })}</td>
                                                        <td className='w-1/5 flex justify-center items-center truncate'>{((pdtFornecedor.precosimples + pdtFornecedor.precotransporte) / 2).toLocaleString('pt', {
                                                            style: 'currency',
                                                            currency: 'KWZ'
                                                        })}</td>

                                                    </tr>)


                                            }) :
                                                (<tr className='flex justify-center items-center' >
                                                    <td colSpan={5} className=' w-full'>Não existe produtos de fornecedores na base de dados</td>
                                                </tr>)

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default Home
