import Head from 'next/head'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { fetchAllProdutosFornecedor, relatorioData } from '../redux/painelSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import moment from 'moment';
import { update } from '../redux/searchGeral';
import { GetServerSidePropsContext } from 'next';

import nookies from 'nookies'
//External Components
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

// import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
// Tipagem do Produto
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
    produto_id: ProdutoType;
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
    //  const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name:
    // 'Page B', uv: 500, pv: 3400, amt: 3400 }];
    const [searchType,
        setSearchType] = useState('Produto')

    //Objecto Produto-Fornecedor
    const [produtosFornecedores,
        setProdutosFornecedores] = useState<Array<ProdutoFornecedorType>>([])
    // const [reportProdutoByFornecedor, setReportProdutoByFornecedor] =
    // useState<Array<RelatorioProdutoTypeRef>>([])

    const [categories,
        setCategories] = useState<Array<string>>([])
    //  const [dataChart, setdataChart] = useState<Array<number>>([]) const
    // [produtoId, setProdutoId] = useState(0) const [fornecedorId, setFornecedorId]
    // = useState(0)

    const [optionsChart,
        setOptionsChart] = useState({
            options: {
                chart: {
                    height: 200,
                    zoom: {
                        enabled: true
                    },
                    toolbar: {
                        show: false
                    }
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
                colors: ['#606eda', '#bde857', '#546E7A']
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
            },
            legend: {
                position: 'bottom',
                horizontalAlign: "center"
            }

        })

    /**
 * Método que busca todos os produtos de fornecedores (Cotações) no banco de dados pelo reduxToolkit
 */
    const getAllProductsByFornecedor = async () => {
        const datas = await dispatch(fetchAllProdutosFornecedor());
        const dataUnwrap = unwrapResult(datas);

        if (dataUnwrap) {
            setProdutosFornecedores(dataUnwrap)
        }

    }

    //Search Produto
    let filteredProducts: ProdutoFornecedorType[] = []
    if (description !== '') {
        if (searchType === 'Produto') {
            filteredProducts = produtosFornecedores.filter((product) => product.produto_id.descricao.toLowerCase().includes(description.toLowerCase()))

        } else {
            filteredProducts = produtosFornecedores.filter((product) => product.fornecedor_id.nome_fornecedor.toLowerCase().includes(description.toLowerCase()))

        }
    }
    /**
 * Método criado para buscar os dados da pesquisa e gerar o gráfico com base neles
 */
    async function start() {

        const dataArray = new Array<number>();

        const categoryArray = new Array<string>()
        const data = await fetchRelatorio();
        if (filteredProducts
            ?.length > 0) {

            const resultProduts = data
                ?.filter((produto: any) => produto.produto_id === filteredProducts[0].produto_id.id)

            resultProduts
                ?.forEach((report: any) => {
                    dataArray.push(report.precosimples_antigo)
                    categoryArray.push(report.created_at)
                })

        } else {

            data
                ?.forEach((report: any) => {

                    dataArray.push(report.precosimples_antigo)
                    categoryArray.push(report.created_at)
                })
        }

        setOptionsChart({
            ...optionsChart,
            series: [
                {
                    name: 'Média',
                    data: dataArray
                }
            ],
            options: {
                ...optionsChart.options,
                xaxis: {
                    type: 'datetime',
                    categories: categoryArray
                }
            }
        })

    }

    /**
 * Método responsável por buscar os dados da View no supabase
 */
    const fetchRelatorio = async () => {
        const res = await dispatch(relatorioData())
        if (res.payload)
            return res.payload
        else
            return null
    }

    useEffect(() => {

        dispatch(update({ description, page: 'Produto' }))

        getAllProductsByFornecedor()

    }, [])

    useEffect(() => {
        // searchProduto()
        start();
    }, [description])

    return (
        <div className='-mt-24 px-5 py-4 flex gap-3 overflow-hide-scroll-bar'>
            <Head>
                <title>Painel de controlo</title>
            </Head>
            <div
                className='bg-white w-full p-5 rounded shadow-md max-h-[30rem] overflow-auto overflow-hide-scroll-bar print:shadow-none'>
                <div
                    className=' border-2 border-dashed rounded px-5  text-center print:border-0 animate__animated animate__fadeIn overflow-auto overflow-hide-scroll-bar'>
                    <div className='flex justify-between items-center w-full p-2'>

                        <h1 className='text-2xl font-bold'>{`PAINEL DE CONTROLO  ${page === 'Produto'
                            ? ' - ' + description
                            : ''}`}</h1>
                        <div className='flex gap-3 print:invisible'>
                            <label
                                htmlFor="Fornecedor"
                                className='text-md font-bold cursor-pointer '
                                onClick={() => setSearchType('Fornecedor')}>
                                <input
                                    type={'radio'}
                                    id='Fornecedor'
                                    name='Searchtype'
                                    className='text-md font-bold cursor-pointer' />
                                &nbsp; Fornecedor
                            </label>
                            <label
                                htmlFor="Produto"
                                className='text-md font-bold cursor-pointer'
                                onClick={() => setSearchType('Produto')}>
                                <input
                                    type={'radio'}
                                    id='Produto'
                                    name='Searchtype'
                                    className='text-md font-bold cursor-pointer' />
                                &nbsp; Produto
                            </label>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-wrap items-center justify-center mb-4 mt-2'>

                        <div className='border shadow rounded bg-white p-3 order-2'>
                            {/** Gráfico de Preço vs Data */}
                            <h4 className='text-left pl-8 font-bold'>Gráfico de Custos</h4>
                            {/**
                                 *
                                   <LineChart width={500} height={300} data={data}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                                    </LineChart>
                                 */}
                            <Chart
                                options={optionsChart.options}
                                series={optionsChart.series}
                                type="area"
                                width={400} />

                        </div>
                        <div
                            className='border shadow rounded bg-white py-5 px-3  max-w-5xl h-[19rem]  overflow-auto overflow-hide-scroll-bar flex flex-col print:shadow-none print:border-0 order-1'>

                            <div className='w-full'>
                                <table className='p-2 flex flex-col gap-2'>
                                    <thead className=''>
                                        <tr
                                            className='p-2 my-2 flex items-center gap-10 text-center border shadow-sm rounded bg-gray-500'>

                                            <th className='w-1/5 text-center'>Descrição</th>
                                            <th className='w-1/5 text-center'>Nome do fornecedor</th>
                                            <th className='w-1/5 text-center'>Data actualização recente</th>
                                            <th className='w-1/5 text-center'>preço s/transporte</th>
                                            <th className='w-1/5 text-center'>preço c/transporte</th>
                                            <th className='w-1/5 text-center'>Preço Médio</th>
                                        </tr>
                                    </thead>
                                    <tbody className='flex flex-col gap-2'>
                                        {(produtosFornecedores.length > 0 && filteredProducts.length === 0)
                                            ? produtosFornecedores.map((pdtFornecedor, index) => {
                                                if (index < 2) {
                                                    return (
                                                        <tr key={index} className='flex shadow rounded p-1'>
                                                            <td className='w-1/5 flex justify-center items-center '>{pdtFornecedor.produto_id.descricao}</td>
                                                            <td className='w-1/5 flex justify-center items-center '>{pdtFornecedor.fornecedor_id.nome_fornecedor}</td>
                                                            <td className='w-1/5 flex justify-center items-center '>{moment(pdtFornecedor.updated_at).format('L')}</td>
                                                            <td className='w-1/5 flex justify-center items-center '>{pdtFornecedor
                                                                .precosimples
                                                                .toLocaleString('pt', {
                                                                    style: 'currency',
                                                                    currency: 'KWZ'
                                                                })}</td>
                                                            <td className='w-1/5 flex justify-center items-center '>{pdtFornecedor
                                                                .precotransporte
                                                                .toLocaleString('pt', {
                                                                    style: 'currency',
                                                                    currency: 'KWZ'
                                                                })}</td>
                                                            <td className='w-1/5 flex justify-center items-center '>{((pdtFornecedor.precosimples + pdtFornecedor.precotransporte) / 2).toLocaleString('pt', {
                                                                style: 'currency',
                                                                currency: 'KWZ'
                                                            })}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                            : filteredProducts.map((pdtFornecedor, index) => {
                                                return (
                                                    <tr key={index} className='flex shadow rounded p-1'>
                                                        <td className='w-1/5 flex justify-center items-center '>{pdtFornecedor.produto_id.descricao}</td>
                                                        <td className='w-1/5 flex justify-center items-center '>{pdtFornecedor.fornecedor_id.nome_fornecedor}</td>
                                                        <td className='w-1/5 flex justify-center items-center '>{moment(pdtFornecedor.updated_at).format('L')}</td>
                                                        <td className='w-1/5 flex justify-center items-center '>{pdtFornecedor
                                                            .precosimples
                                                            .toLocaleString('pt', {
                                                                style: 'currency',
                                                                currency: 'KWZ'
                                                            })}</td>
                                                        <td className='w-1/5 flex justify-center items-center '>{pdtFornecedor
                                                            .precotransporte
                                                            .toLocaleString('pt', {
                                                                style: 'currency',
                                                                currency: 'KWZ'
                                                            })}</td>
                                                        <td className='w-1/5 flex justify-center items-center '>{((pdtFornecedor.precosimples + pdtFornecedor.precotransporte) / 2).toLocaleString('pt', {
                                                            style: 'currency',
                                                            currency: 'KWZ'
                                                        })}</td>
                                                    </tr>
                                                )
                                            })
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

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const cookie = nookies.get(context)

    if (!cookie.USER_LOGGED) {
        // If no user, redirect to index.
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    // https://www.freecodecamp.org/news/the-complete-guide-to-full-stack-development
    // -with-supabas/   doc-full stack supabase App with Nextjs
    // https://jitsu.com/blog/supabase-nextjs-middleware
    // https://github.com/vercel/next.js/blob/canary/examples/with-supabase-auth-real
    // time-db/pages/index.js https://nextjs.org/docs/authentication If there is a
    // user, return it.
    return {
        props: {
            cookie
        }
    }
}

export default Home
