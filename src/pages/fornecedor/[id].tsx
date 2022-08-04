import Head from 'next/head';
import Image from 'next/image';


import Perfil from '../../assets/user.png'

import EditarModal from '../../components/fornecedor/EditarModal';

import { useRouter } from 'next/router';


import { FaEdit, FaTrash, FaUser } from 'react-icons/fa'
import { useState } from 'react';

import dynamic from 'next/dynamic';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

const FornecedorInfo = () => {

    const { query } = useRouter();
    const { id } = query
    const [showModal, setShowModal] = useState(false)

    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Fornecedor {id}</title>
            </Head>
            {/**Modal para editar fornecedor */}
            <EditarModal isOpen={showModal} setIsOpen={setShowModal} />
            {/**Confirm alert**/}
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

            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded px-5 py-3 min-h-full overflow-y-auto'>
                    <h3 className='text-center font-bold text-xl'>INFORMAÇÕES DO FORNECEDOR {id}</h3>
                    <div className='flex flex-col lg:flex-row gap-4 lg:justify-between justify-center mt-2 lg:mt-0 '>
                        <div className='flex flex-col space-y-4 order-2 lg:order-1'>
                            <div>
                                <label className='font-bold'>Nome : </label><span>Jairo dos Santos</span>
                            </div>
                            <div>
                                <label className='font-bold'>Telefone 1 : </label><span>+244 929-84-89-58</span>
                            </div>
                            <div>
                                <label className='font-bold'>Telefone 2 : </label><span>+244 928-30-80-96</span>
                            </div>
                            <div>
                                <label className='font-bold'>Endereço : </label><span>Benfica, espaço girafa.</span>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Fornecedor de:</label>
                                <ul className='flex flex-col space-y-2 list-disc ml-8'>
                                    <li>Brita <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/m3 sem transporte</span></li>
                                    <li>Mosaico cerâmico <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/caixa c/transporte</span></li>
                                    <li>Tubos <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/m3 sem transporte</span></li>
                                    <li>Pladur <span className='text-gray-400 text-xs'>- 4.600,00 AKWZ/folha sem transporte</span></li>
                                    <li>Portas <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/m3 c/transporte</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center align-center  space-y-2 order-1 lg:order-2'>

                            <div className='flex justify-center align-center'>
                                <FaUser className='h-44  w-44 text-gray-200' />
                            </div>
                            <div className='flex gap-3 justify-center align-center'>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className='flex space-x-2 items-center btn shadow cursor-pointer'>
                                    <FaEdit />
                                    <span>Editar</span>
                                </button>
                                <button
                                    onClick={() => setShowQuestionAlert(true)}
                                    className='flex space-x-2 items-center btn shadow bg-gray-200 text-black'>
                                    <FaTrash />
                                    <span>Apagar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FornecedorInfo
