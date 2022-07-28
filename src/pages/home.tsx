import Head from 'next/head'

import dynamic from 'next/dynamic';
import { useState } from 'react';

import Logo from '../assets/noah.png'
import Image from 'next/image';


//External Components
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

enum ChartHorizontalAlign {
    left = 'left',
    center = 'center',
    right = 'right'
}

enum ChartVerticalAlign {
    top = 'top',
    middle = 'middle',
    bottom = 'bottom'
}
//import { FaUsers } from 'react-icons/fa';

const Home = () => {

    const [optionsChart, setOptionsChart] = useState({
        options: {
            chart: {
                type: 'bar',
                stacked: true,
                stackType: "100%"
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            }

        },
        series: [
            {
                name: "Fornecedor A",
                data: [31, 40, 16, 10, 100]
            },
            {
                name: "Fornecedor B",
                data: [31, 40, 16, 10, 99]
            },
            {
                name: "Fornecedor C",
                data: [31, 33, 16, 10, 99]
            }
        ],
        legend: {
            position: 'bottom',
            horizontalAlign: "center",
        }
    })

    return (
        <div className='-mt-20 px-5 py-4 flex gap-3'>
            <Head>
                <title>Página Inicial</title>
            </Head>
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar print:shadow-none'>
                <div className=' border-2 border-dashed rounded px-5 min-h-full text-center print:border-0'>
                    <div className='flex justify-between items-center w-[720px] p-2'>

                        <h1 className='text-2xl font-bold'>DASHBOARD</h1>
                    </div>
                    <div className='flex gap-6 flex-wrap items-center justify-center mb-4 mt-2'>

                        <div className='border shadow rounded bg-white  p-3'>
                            {/** Gráfico de Preço vs Data */}
                            <h4 className='text-center font-bold'>Gráfico de Custos</h4>
                            <Chart
                                options={optionsChart.options}
                                series={optionsChart.series}
                                type="line"
                                width={400}
                                height={200}
                            />
                        </div>
                        <div className='border shadow rounded bg-white p-5 w-[30rem] h-64 flex flex-col print:shadow-none print:border-0'>
                            {/** Gráfico à anunciar */}
                            <div className='flex justify-start'>
                                <input type="date" className='rounded border px-2 cursor-pointer' />
                            </div>
                            <div>
                                <table className='p-2 flex flex-col gap-2'>
                                    <thead className=''>
                                        <tr className='p-2 my-2 flex gap-10'>
                                            <th>Fornecedor A</th>
                                            <th>Fornecedor B</th>
                                            <th>Fornecedor C</th>
                                            <th>Preço Médio</th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        <tr className='flex shadow rounded space-x-10 p-2'>
                                            <td>20-02-2022</td>
                                            <td>30-03-2022</td>
                                            <td>04-04-2022</td>
                                            <td>-</td>
                                        </tr>
                                        <tr className='flex shadow rounded space-x-10 p-2'>
                                            <td>20.000,00 AKWZ</td>
                                            <td>20.000,00 AKWZ</td>
                                            <td>20.000,00 AKWZ</td>
                                            <td className='font-bold'>20.000,00 AKWZ</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>

                        {
                            /**
                             * <div className='border shadow rounded bg-white w-96 p-5 text-left'>
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
