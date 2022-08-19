import Head from 'next/head'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FaUsers } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchAllProdutosFornecedor, fetchAllProdutosFornecedorActualizado, fetchAllProdutosFornecedorActualizadoRefatored } from '../redux/painelSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';
import { update } from '../redux/searchGeral';
import { NextApiRequest } from 'next';
import { supabase } from '../utils/supabaseClient';
import { Auth } from '@supabase/ui';
import api from '../service/api';

//External Components
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })


//Tipagem do Produto
type ProdutoType = {
    id: number;
    descricao: string;
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
    // produto_id: ProdutoType[];
    fornecedor_id: FornecedorType;
    precosimples: number;
    precotransporte: number;
    produto_id: ProdutoType
    nomeuser: string;
    categoria: string;
    unidade: string;
    inserted_at: string;
    updated_at: string;
}

//ExtraType
type ExtraType = {
    produto_id: number;
    fornecedor_id: number;
}

//Tipagem de relatorio Gráfico
type RelatorioProdutoType = {
    produtofornecedor_id: number;
    precosimples_antigo: number;
    precotransporte_antigo: string;
    inserted_at: string
}
//Tipagem de relatorio Gráfico
type RelatorioProdutoTypeRef = {
    produto_id: number;
    precosimples_antigo: number;
    fornecedor_id: number;
    created_at: string
}

const Home = () => {

    //Buscar do redux
    const { description, page } = useSelector((state: RootState) => state.Search)
    const dispatch = useDispatch<any>();

    const [searchType, setSearchType] = useState('Produto')

    //Objecto Produto-Fornecedor
    const [produtosFornecedores, setProdutosFornecedores] = useState<Array<ProdutoFornecedorType>>([])
    const [reportProdutoByFornecedor, setReportProdutoByFornecedor] = useState<Array<RelatorioProdutoTypeRef>>([])

    const [categories, setCategories] = useState<Array<string>>([])
    const [dataChart, setdataChart] = useState<Array<number>>([])

    const [produtoId, setProdutoId] = useState(0)
    const [fornecedorId, setFornecedorId] = useState(0)

    const [optionsChart, setOptionsChart] = useState({
        options: {
            chart: {
                height: 200,
                zoom: {
                    enabled: true
                }, toolbar: {
                    show: false
                },
            },
            xaxis: {
                type: "datetime" as const,
                categories: categories
            },
            grid: {
                show: false
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

        },
        tooltip: {
            show: false
        },
        series: [
            {
                name: "Jairo dos Santos",
                data: [31, 50, 80, 10]
            }
        ],
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




    //Método que busca todos os produtos de fornecedores no banco de dados pelo reduxToolkit
    const getAllProductsByFornecedor = async () => {
        const datas = await dispatch(fetchAllProdutosFornecedor());
        const dataUnwrap = unwrapResult(datas);

        if (dataUnwrap) {
            setProdutosFornecedores(dataUnwrap)
        }

    }


    const searchProduto = () => {

        if (description !== '') {
            if (searchType === 'Produto') {
                const filteredProducts = produtosFornecedores.filter((product) => product.produto_id.descricao.toLowerCase().includes(description.toLowerCase()))
                setProdutosFornecedores(filteredProducts)
            } else {
                const filteredFornecedor = produtosFornecedores.filter((product) => product.fornecedor_id.nome_fornecedor.toLowerCase().includes(description.toLowerCase()))
                setProdutosFornecedores(filteredFornecedor)
            }
        } else {
            getAllProductsByFornecedor()
        }
    }


    const fetchReport = async () => {
        const report = await dispatch(fetchAllProdutosFornecedorActualizado({ fornecedor_id: fornecedorId, produto_id: produtoId }));
        const reportUnwrap = unwrapResult(report);

        if (reportUnwrap) {
            setReportProdutoByFornecedor(reportUnwrap)

        }

    }




    function start() {
        fetchReport()
        const dataArray = new Array<number>();

        const categoryArray = new Array<string>()

        if (reportProdutoByFornecedor && reportProdutoByFornecedor.length > 0) {
            reportProdutoByFornecedor.forEach((report) => {

                dataArray.push(report.precosimples_antigo)
                categoryArray.push(report.created_at)
            })
        }
        //  setCategories(categoryArray)
        //setdataChart(dataArray)
        // console.log(dataChart)
        setOptionsChart({ ...optionsChart, series: [{ name: 'Jairo dos Santos', data: dataArray }], options: { ...optionsChart.options, xaxis: { type: 'datetime', categories: categoryArray } } })

    }

    useEffect(() => {

        dispatch(update({ description, page: 'Produto' }))

        getAllProductsByFornecedor()

        fetchReport()

        if (produtosFornecedores.length > 0) {
            setProdutoId(produtosFornecedores[0].produto_id.id)
            setFornecedorId(produtosFornecedores[0].fornecedor_id.id)
        }



        //setOptionsChart({ ...optionsChart, series: produtosFornecedores })
    }, [])

    useEffect(() => { start(); }, [reportProdutoByFornecedor])
    useEffect(() => {
        searchProduto()
        start();
    }, [page, description])

    return (
        <div className='-mt-24 px-5 py-4 flex gap-3 overflow-hide-scroll-bar'>
            <Head>
                <title>Painel de controlo</title>
            </Head>
            <div className='bg-white w-full p-5 rounded shadow-md max-h-[30rem] overflow-auto overflow-hide-scroll-bar print:shadow-none'>
                <div className=' border-2 border-dashed rounded px-5 min-h-full text-center print:border-0 animate__animated animate__fadeIn'>
                    <div className='flex justify-between items-center w-full p-2'>

                        <h1 className='text-2xl font-bold'>{`PAINEL DE CONTROLO  ${page === 'Produto' ? '- ' + description : ''}`}</h1>
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
                    <div className='flex gap-6 flex-wrap items-center justify-center mb-4 mt-2'>

                        <div className='border shadow rounded bg-white p-3 order-2'>
                            {/** Gráfico de Preço vs Data */}
                            <h4 className='text-left pl-8 font-bold'>Gráfico de Custos</h4>
                            <Chart
                                options={optionsChart.options}
                                series={optionsChart.series}
                                type="area"
                                width={400}
                            />
                        </div>
                        <div className='border shadow rounded bg-white py-5 px-3 w-[35rem] h-[19rem] flex flex-col print:shadow-none print:border-0 order-1'>

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
                                                if (index < 4) {
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
                                                }
                                            }) :
                                                (<tr className='flex justify-center items-center' >
                                                    <td colSpan={5} className=' w-full'>Não existe produtos de fornecedores na base de dados</td>
                                                </tr>)

                                        }
                                    </tbody>
                                </table>
                                <label className='text-left  mt-3 font-bold'>Total geral: {produtosFornecedores.length}</label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export async function getServerSideProps(req: NextApiRequest) {
    //  const { user } = await supabase.auth.api.getUserByCookie(req)
    // const session = supabase.auth.session()

    // console.log(user)
    //const user = supabase.auth.user()
    //console.log(UserAuth)

    // const response = await fetch(`http://localhost:3000/api/getUser`).then((response) =>
    //   response.json()
    //);
    const res = await api.get('api/getUser');

    const { user } = res.data;

    if (!user) {
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
            user
        }
    }
}

export default Home
