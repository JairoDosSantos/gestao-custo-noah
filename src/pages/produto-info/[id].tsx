import Head from 'next/head'


import { useRouter } from 'next/router';
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import EditarProdutoModal from '../../components/produto/ModalEditarProduto';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

const InfoProduto = () => {

    const { query } = useRouter();
    const { id } = query

    //Estados do Modal de Edição
    const [openModal, setOpenModal] = useState(false);

    //Estados dos sweetAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Informação sobre o Produto {id}</title>
            </Head>

            {/** Edit Modal */}
            <EditarProdutoModal isOpen={openModal} setIsOpen={setOpenModal} />

            {/**Confirm Alert */}
            <SweetAlert2
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
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-y-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded px-5 py-3 min-h-full '>
                    <h3 className='text-center font-bold text-xl'>INFORMAÇÕES DO PRODUTO {id}</h3>
                    <div className='flex flex-col lg:flex-row gap-4 lg:justify-between lg:mt-0 mt-2'>
                        <div className='flex flex-col  space-y-4'>
                            <div>
                                <label className='font-bold'>Nome : </label><span>Bloco de 12</span>
                            </div>
                            <div>
                                <label className='font-bold'>Menor Preço símples : </label><span>1.200,00 AKWZ</span>
                            </div>
                            <div>
                                <label className='font-bold'>Menor Preço C/transporte : </label><span>1.500,00 AKWZ</span>
                            </div>
                            <div>
                                <label className='font-bold'>Unidade : </label><span>cm</span>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Categorias a que pertence:</label>
                                <ul className='flex flex-col gap-3 mt-1 list-disc ml-8'>
                                    <li>Primeira </li>
                                    <li>Segunda </li>
                                    <li>Terceira</li>
                                </ul>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Fornecedores:</label>
                                <ul className='flex flex-col gap-3 mt-1 list-disc ml-8'>
                                    <li>Jairo dos Santos <span className='text-gray-400 text-xs'>- 1.200,00 AKWZ/m3 sem transporte- +244 929 84 89 58</span></li>
                                    <li>Manuel Rosário <span className='text-gray-400 text-xs'>- 1.500,00 AKWZ/caixa c/transporte- +244 929 84 89 58</span></li>
                                    <li>Wladimiro Carvalho <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/m3 sem transporte- +244 929 84 89 58</span></li>
                                    <li>Jairo Leandro <span className='text-gray-400 text-xs'>- 4.600,00 AKWZ/folha sem transporte- +244 929 84 89 58</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col align-top  space-y-2'>

                            <div className='flex flex-wrap  gap-3'>
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className='flex space-x-2 items-center btn order-1'
                                >
                                    <FaEdit /> <span>Editar</span>
                                </button>
                                <button className='btn bg-green-400 flex space-x-2 items-center order-3 lg:order-2'>
                                    <FaPrint />
                                    <span>Imprimir</span>
                                </button>
                                <button
                                    onClick={() => setShowQuestionAlert(true)}
                                    className='flex space-x-2 items-center btn bg-gray-200 text-black order-2 lg:order-3 '>
                                    <FaTrash /> <span>Apagar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default InfoProduto
