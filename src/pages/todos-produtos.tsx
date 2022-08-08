import Head from 'next/head'
import { useRouter } from 'next/router'

import { useState } from 'react';
import { FaFilePdf, FaEdit, FaTrash, FaPrint } from 'react-icons/fa'

import dynamic from 'next/dynamic';
import EditarProdutoModal from '../components/produto/ModalEditarProduto';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

const TodosProdutos = () => {

    const router = useRouter()

    const [openModal, setOpenModal] = useState(false);
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Lista de Produto</title>
            </Head>

            {/**Modal Edit */}
            <EditarProdutoModal isOpen={openModal} setIsOpen={setOpenModal} />

            {/**Confirm alert */}
            <SweetAlert2
                backdrop={true}
                show={showConfirmAlert}
                title='Sucesso'
                text='Sub-Categoria adicionada com sucesso'
                onConfirm={() => setShowConfirmAlert(false)}
                didClose={() => setShowConfirmAlert(false)}
                didDestroy={() => setShowConfirmAlert(false)}
                icon='question'
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                showLoaderOnConfirm={true}
                showCancelButton={true}
                confirmButtonColor="#4051ef"
            />

            {/**Error Alert */}
            <SweetAlert2
                backdrop={true}
                show={showErrorAlert}
                title='Erro'
                text='Ocorreu um erro ao efectuar a operação'
                icon='error'
                onConfirm={() => setShowErrorAlert(false)}
                didClose={() => setShowErrorAlert(false)}
                didDestroy={() => setShowErrorAlert(false)}
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                confirmButtonColor="#4051ef"
            />

            {/** Question Alert */}
            <SweetAlert2
                backdrop={true}
                show={showQuestionAlert}
                title='Atenção'
                text='Tem a certeza que deseja efectuar esta operação ?'
                icon='question'
                onConfirm={() => setShowQuestionAlert(false)}
                didClose={() => setShowQuestionAlert(false)}
                didDestroy={() => setShowQuestionAlert(false)}
                allowOutsideClick={true}
                allowEnterKey={true}
                allowEscapeKey={true}
                showConfirmButton={true}
                showCancelButton={true}
                cancelButtonText='Cancelar'
                confirmButtonColor="#4051ef"
                confirmButtonText="Sim"

            />
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full animate__animated animate__fadeIn'>
                    <h3 className='font-bold text-2xl'>Relatório - Lista de produtos</h3>
                    <div className='flex gap-5 mt-3'>
                        <table className='min-w-full'>
                            <thead >
                                <tr className='border flex items-center justify-around mx-2 my-4 text-center p-2 shadow-sm rounded bg-gray-500'>
                                    <th className='w-1/6'>Descrição</th>
                                    <th className='w-1/6'>unidade</th>
                                    <th className='w-1/6'>Sub-Categoria</th>
                                    <th className='w-1/6'>Editar</th>
                                    <th className='w-1/6'>Apagar</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    className=' hover:cursor-pointer flex mx-3 items-center justify-around my-2 shadow rounded p-2 text-center'>

                                    <td
                                        onClick={() => router.push('/produto-info/1')}
                                        className='w-1/6 underline hover:text-gray-400'>Bloco de 6</td>
                                    <td className='w-1/6'>cm</td>
                                    <td className='w-1/6'>Alguma</td>
                                    <td className='w-1/6 flex justify-center'>
                                        <button
                                            onClick={() => setOpenModal(true)}
                                            className='flex  space-x-2 items-center btn rounded-full h-5 w-12'
                                            title='Editar'
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td className='w-1/6 text-center flex items-center justify-center'>
                                        <button
                                            onClick={() => setShowQuestionAlert(true)}
                                            className='flex space-x-2 items-center btn bg-gray-200 text-black rounded-full h-5 w-12'
                                            title='Apagar'
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                                <tr
                                    className=' hover:cursor-pointer flex mx-3 items-center justify-around my-2 shadow rounded p-2 text-center'>

                                    <td
                                        onClick={() => router.push('/produto-info/2')}
                                        className='w-1/6 underline hover:text-gray-400'>Bloco de 12</td>
                                    <td className='w-1/6'>cm</td>
                                    <td className='w-1/6'>Alguma</td>
                                    <td className='w-1/6 flex justify-center'>
                                        <button
                                            onClick={() => setOpenModal(true)}
                                            className='flex  space-x-2 items-center btn rounded-full h-5 w-12'
                                            title='Editar'
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td className='w-1/6 text-center flex items-center justify-center'>
                                        <button
                                            onClick={() => setShowQuestionAlert(true)}
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
