import Head from 'next/head'
import { useRouter } from 'next/router'

import React from 'react'
import { FaFilePdf, FaEdit, FaTrash, FaPrint } from 'react-icons/fa'

const TodosProdutos = () => {

    const router = useRouter()

    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Lista de Produto</title>
            </Head>
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full'>
                    <h3 className='font-bold text-2xl'>Relatório - Lista de produtos</h3>
                    <div className='flex gap-5 mt-3'>
                        <table className='min-w-full'>
                            <thead >
                                <tr className='border flex items-center justify-around mx-2 my-4 text-center p-2 shadow-sm rounded bg-gray-500'>
                                    <th className='w-1/6'>Descrição</th>
                                    <th className='w-1/6'>Preço símples</th>
                                    <th className='w-1/6'>Preço c/transporte</th>
                                    <th className='w-1/6'>unidade</th>
                                    <th className='w-1/6'>Categoria</th>
                                    <th className='w-1/6'>Fornecedores</th>
                                    <th className='w-1/6'>Editar</th>
                                    <th className='w-1/6'>Apagar</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    onClick={() => router.push('/produto-info/1')}
                                    className=' hover:cursor-pointer flex mx-3 items-center justify-around my-2 shadow rounded p-2 text-center'
                                >

                                    <td className='w-1/6'>Bloco de 6</td>
                                    <td className='w-1/6'>800,00 AKWZ</td>
                                    <td className='w-1/6'>1.200,00 AKWZ</td>
                                    <td className='w-1/6'>cm</td>
                                    <td className='w-1/6'>Alguma</td>
                                    <td className='w-1/6'>Jairo, etc. ...</td>
                                    <td className='w-1/6 flex justify-center'>
                                        <button
                                            className='flex  space-x-2 items-center btn rounded-full h-5 w-12'
                                            title='Editar'
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td className='w-1/6 text-center flex items-center justify-center'>
                                        <button
                                            className='flex space-x-2 items-center btn bg-gray-200 text-black rounded-full h-5 w-12'
                                            title='Apagar'
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                                <tr
                                    onClick={() => router.push('/produto-info/2')}
                                    className=' hover:cursor-pointer flex mx-3 items-center justify-around my-2 shadow rounded p-2 text-center'
                                >

                                    <td className='w-1/6'>Bloco de 12</td>
                                    <td className='w-1/6'>1.000,00 AKWZ</td>
                                    <td className='w-1/6'>1.500,00 AKWZ</td>
                                    <td className='w-1/6'>cm</td>
                                    <td className='w-1/6'>Alguma</td>
                                    <td className='w-1/6'>Jairo, Manel. ...</td>
                                    <td className='w-1/6 flex justify-center'>
                                        <button
                                            className='flex  space-x-2 items-center btn rounded-full h-5 w-12'
                                            title='Editar'
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td className='w-1/6 text-center flex items-center justify-center'>
                                        <button
                                            className='flex space-x-2 items-center btn bg-gray-200 text-black rounded-full h-5 w-12'
                                            title='Apagar'
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>


                        <div className='flex justify-end gap-3'>
                            <button className='btn flex space-x-2 items-center'>
                                <FaPrint />
                                <span>Imprimir</span>
                            </button>
                            <button className='btn bg-green-400 flex space-x-2 items-center'>
                                <FaPrint />
                                <span>Imprimir tudo</span>
                            </button>
                        </div>
                        <div className='text-red-700 mt-2 text-center'>

                            <p className='text-sm hidden'>Os campos com * o seu preenchimento é de carácter obrigatório.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default TodosProdutos
