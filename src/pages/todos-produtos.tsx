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
                                <tr className=' flex items-center justify-around space-x-11 mx-3 my-4 text-center'>
                                    <th>Descrição</th>
                                    <th>Preço símples</th>
                                    <th>Preço c/transporte</th>
                                    <th>unidade</th>
                                    <th>Categoria</th>
                                    <th>Fornecedores</th>
                                    <th>Editar</th>
                                    <th>Apagar</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    onClick={() => router.push('/produto-info/1')}
                                    className=' hover:cursor-pointer flex mx-3 items-center justify-around space-x-5 my-2 shadow rounded p-2'
                                >

                                    <td className='truncate'>Bloco de 12</td>
                                    <td>800,00 AKWZ</td>
                                    <td>1.200,00 AKWZ</td>
                                    <td>cm</td>
                                    <td>Alguma</td>
                                    <td className='truncate'>Jairo, etc. ...</td>
                                    <td>
                                        <button
                                            className='flex  space-x-2 items-center btn rounded-full h-5 w-12'
                                            title='Editar'
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td>
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
                                    className=' hover:cursor-pointer flex mx-3 items-center justify-around space-x-5 my-2 shadow rounded p-2'
                                >

                                    <td className='truncate'>Cimento</td>
                                    <td>3.600,00 AKWZ</td>
                                    <td>4.200,00 AKWZ</td>
                                    <td>cm</td>
                                    <td>Alguma</td>
                                    <td className='truncate'>Jairo, etc....</td>
                                    <td>
                                        <button
                                            className='flex  space-x-2 items-center btn rounded-full h-5 w-12'
                                            title='Editar'
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td>
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
