import Image from 'next/image'
import Head from 'next/head'


//Imagens do Perfil do fornecedor
import Fornecedor from '../assets/user.png'

import { FaPrint } from 'react-icons/fa';

const ListaProdutos = () => {
    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Lista de Produto</title>
            </Head>
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar print:shadow-none'>
                <div className=' border-2 border-dashed print:border-0 rounded p-5 min-h-full'>
                    <h3 className='font-bold text-2xl'>RELATÓRIO - CUSTO DE MATERIAL</h3>
                    <div className='flex gap-5 mt-3'>
                        <table className='min-w-full'>
                            <thead>
                                <tr className='flex items-center justify-around  mx-3 my-4 text-center border p-2 shadow-sm rounded bg-gray-500'>
                                    <th className=' w-1/6'>Fornecedor</th>
                                    <th className=' w-1/6'>Telefone</th>
                                    <th className=' w-1/6'>Telefone 2</th>
                                    <th className=' w-1/6'>Endereço</th>
                                    <th className=' w-1/6'>Custo c/transporte</th>
                                    <th className=' w-1/6'>Custo s/transporte</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className=' hover:brightness-75 hover:cursor-pointer flex mx-3 items-center justify-around  my-2 shadow rounded p-2 border '>
                                    <td className=' w-1/6 text-center'>Fornecedor A</td>
                                    <td className=' w-1/6 text-center'>+244 929-84-89-58</td>
                                    <td className=' w-1/6 text-center'>+244 928-30-80-96</td>
                                    <td className='  w-1/6 text-center'>Projecto nova-vida</td>
                                    <td className=' w-1/6 text-center'>60.000,00 AKWZ</td>
                                    <td className=' w-1/6 text-center'>1.500.000,00 AKWZ</td>
                                </tr>
                                <tr className=' hover:brightness-75 hover:cursor-pointer flex mx-3 items-center justify-around  my-2 shadow rounded p-2 border '>
                                    <td className=' w-1/6 text-center'>Fornecedor A</td>
                                    <td className=' w-1/6 text-center'>+244 929-84-89-58</td>
                                    <td className=' w-1/6 text-center'>+244 928-30-80-96</td>
                                    <td className='  w-1/6 text-center'>Urbanização boa vida</td>
                                    <td className=' w-1/6 text-center'>60.000,00 AKWZ</td>
                                    <td className=' w-1/6 text-center'>1.500.000,00 AKWZ</td>
                                </tr>
                                <tr className=' hover:brightness-75 hover:cursor-pointer flex mx-3 items-center justify-around  my-2 shadow rounded p-2 border '>
                                    <td className=' w-1/6 text-center'>Fornecedor A</td>
                                    <td className=' w-1/6 text-center'>+244 929-84-89-58</td>
                                    <td className=' w-1/6 text-center'>+244 928-30-80-96</td>
                                    <td className='  w-1/6 text-center'>Jardim de Rosas</td>
                                    <td className=' w-1/6 text-center'>60.000,00 AKWZ</td>
                                    <td className=' w-1/6 text-center'>1.500.000,00 AKWZ</td>

                                </tr>
                                <tr className=' hover:brightness-75 hover:cursor-pointer flex mx-3 items-center justify-around  my-2 shadow rounded p-2 border '>
                                    <td className=' w-1/6 text-center'>Fornecedor A</td>
                                    <td className=' w-1/6 text-center'>+244 929-84-89-58</td>
                                    <td className=' w-1/6 text-center'>+244 928-30-80-96</td>
                                    <td className='  w-1/6 text-center'>Largo da Maianga</td>
                                    <td className=' w-1/6 text-center'>60.000,00 AKWZ</td>
                                    <td className=' w-1/6 text-center'>1.500.000,00 AKWZ</td>
                                </tr>
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
