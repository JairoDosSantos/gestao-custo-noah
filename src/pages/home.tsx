import Head from 'next/head'

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

//External Components
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })


const Home = () => {

    //Buscar do redux
    const { description, page } = useSelector((state: RootState) => state.Search)

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
                        <div className='border shadow rounded bg-white py-5 px-3 w-[30rem] h-[19rem] flex flex-col print:shadow-none print:border-0 order-1'>
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
                                            <th className='w-1/4'>Fornecedor A</th>
                                            <th className='w-1/4'>Fornecedor B</th>
                                            <th className='w-1/4'>Fornecedor C</th>
                                            <th className='w-1/4'>Preço Médio</th>
                                        </tr>
                                    </thead>
                                    <tbody className='flex flex-col gap-2'>
                                        <tr className='flex shadow rounded p-1'>
                                            <td className='w-1/4 flex justify-center items-center'>20-02-2022</td>
                                            <td className='w-1/4 flex justify-center items-center'>30-03-2022</td>
                                            <td className='w-1/4 flex justify-center items-center'>04-04-2022</td>
                                            <td className='w-1/4 flex justify-center items-center'>-</td>
                                        </tr>
                                        <tr className='flex shadow rounded p-1'>
                                            <td className='w-1/4 flex justify-center items-center'>20.000,00 AKWZ</td>
                                            <td className='w-1/4 flex justify-center items-center'>20.000,00 AKWZ</td>
                                            <td className='w-1/4 flex justify-center items-center'>20.000,00 AKWZ</td>
                                            <td className='w-1/4 flex justify-center items-center font-bold'>20.000,00 AKWZ</td>
                                        </tr>
                                        <tr className='flex shadow rounded p-1'>
                                            <td className='w-1/4 flex justify-center items-center'>15.000,00 AKWZ</td>
                                            <td className='w-1/4 flex justify-center items-center'>15.000,00 AKWZ</td>
                                            <td className='w-1/4 flex justify-center items-center'>15.000,00 AKWZ</td>
                                            <td className='w-1/4 flex justify-center items-center font-bold'>15.000,00 AKWZ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        {
                            /**
                             * 
                                <div className='border shadow rounded bg-white w-96 p-5 text-left'>
                                    <span className='text-blue-700 font-bold'>Total de fornecedores</span>
                                    <div className='flex items-center font-bold justify-between'>
                                        <span>4</span>
                                        <FaUsers className='text-blue-700 h-14 w-14' />
                                    </div>
                                </div>
                             */
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home
