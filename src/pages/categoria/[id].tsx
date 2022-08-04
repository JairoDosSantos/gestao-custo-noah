import { useRouter } from "next/router"
import { useState } from "react";

import Head from "next/head"

import { FaEdit, FaTrash, FaFigma } from "react-icons/fa"

import dynamic from 'next/dynamic';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

import EditarCategoriaModal from "../../components/categoria/ModalCategoriaEdit";

const CategoriaItem = () => {
    const { query } = useRouter()
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
                <title>Categoria {id}</title>
            </Head>

            {/** Edit Modal */}
            <EditarCategoriaModal isOpen={openModal} setIsOpen={setOpenModal} />

            {/**Confirm alert**/}
            <SweetAlert2
                show={showConfirmAlert}
                title='Sucesso'
                text='Sub-Categoria adicionada com sucesso'
                onConfirm={() => setShowConfirmAlert(false)}
                didClose={() => setShowConfirmAlert(false)}
                didDestroy={() => setShowConfirmAlert(false)}
                icon='success'
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

            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-y-hidden'>
                <div className=' border-2 border-dashed rounded px-5 py-3 min-h-full overflow-y-auto'>
                    <h3 className='text-center font-bold text-xl'>Informações da categoria {id}</h3>
                    <div className='flex gap-4 justify-between'>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <label className='font-bold'>Descrição : </label><span>SOLOS</span>
                            </div>
                            <div>
                                <label className='font-bold'>Data de cadastro : </label><span>25 de julho de 2022</span>
                            </div>
                            <div>
                                <label className='font-bold'>Cadastrado por : </label><span>Jairo dos Santos</span>
                            </div>

                        </div>
                        <div className='flex flex-col justify-center space-y-2'>
                            <FaFigma className="h-44 w-44" />
                            <div className='flex gap-3'>
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className='flex space-x-2 items-center btn'>
                                    <FaEdit /> <span>Editar</span>
                                </button>
                                <button
                                    onClick={() => setShowQuestionAlert(true)}
                                    className='flex space-x-2 items-center btn bg-gray-200 text-black'>
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

export default CategoriaItem
