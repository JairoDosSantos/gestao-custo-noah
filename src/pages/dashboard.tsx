import { NextPage } from 'next';


import dynamic from 'next/dynamic';
import { useState } from 'react';

//External Components
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })





const Dashboard: NextPage = () => {
    const Donut = {
        series: [4, 2],
        chartOptions: {
            labels: ['Homens', 'Mulheres'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
            }
        }
    }

    const [optionsChart, setOptionsChart] = useState({
        options: {
            chart: {
                stacked: true,
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            }

        },
        series: [
            {
                name: "T.I.",
                data: [31, 40]
            },
            {
                name: "R.H",
                data: [11, 32]
            }
        ],
        legend: {
            position: 'bottom',
            horizontalAlign: "center",
        }

    })

    return (
        <main className='max-w-3xl mx-auto mt-5 p-5 flex gap-8 h-auto'>
            <aside className='pt-8 px-2 max-w-sm w-60'>
                <div className='rounded-full mx-auto  w-25 h-10 flex items-center justify-center border-b mb-2'>
                    <h1 className='text-blue-700 font-bold text-sm'>My <span className='text-red-500'>Suppliers</span></h1>
                </div>
                <ul className='space-y-3 text-gray-600'>
                    <li className='group flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer hover:brightness-75'>
                        <div className='group-hover:w-1 group-hover:h-5 group-hover:bg-gray-600'></div>
                        <span>Criar Fornecedor</span>
                    </li>
                    <li className='group flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer hover:brightness-75'>
                        <div className='group-hover:w-1 group-hover:h-5 group-hover:bg-gray-600'></div>
                        <span>Inserir produto</span>
                    </li>
                    <li className='group flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer hover:brightness-75'>
                        <div className='group-hover:w-1 group-hover:h-5 group-hover:bg-gray-600'></div>
                        <span>Inserir produto</span>
                    </li>
                </ul>
            </aside>
            <div className='text-center w-full'>
                <h1 className='font-semibold text-center'>Dashboard</h1>

                <section className='flex gap-3'>
                    <div>
                        <Chart
                            options={optionsChart.options}
                            series={optionsChart.series}
                            type="line"
                            width="200"

                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Dashboard;