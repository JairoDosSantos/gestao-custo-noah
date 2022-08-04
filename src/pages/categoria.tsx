import { useState } from 'react';


import { useRouter } from 'next/router'
import Head from 'next/head'

import dynamic from 'next/dynamic';

import { FaSave, FaPlus } from 'react-icons/fa'
import NovaCategoriaModal from '../components/categoria/ModalNovaCategoria';

//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'

//INSTALAR O yarn add -D @types/sweetalert2-react
//import SweetAlert2 from 'react-sweetalert2';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })



//Tipagem
type FormValues = {
    subCategoria: string;
    categoria: number
}

const Categoria = () => {

    const router = useRouter()


    //Estados do Modal de Edição
    const [openModal, setOpenModal] = useState(false);

    //Estados dos sweetAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)


    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = (data) => { console.log(data); setShowConfirmAlert(true) }
    return (
        <div className='-mt-20 p-5 flex lg:flex-row flex-col gap-3'>
            <Head>
                <title>Criar Categoria</title>
            </Head>

            {/** Edit Modal */}
            <NovaCategoriaModal isOpen={openModal} setIsOpen={setOpenModal} />


            {/**Confirm alert**/}
            <SweetAlert2
                backdrop={true}
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
                text='Tem a certeza que deseja efectuar esta operação?'
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
            {
                /**
                 *  <SweetAlert2
                        show={showAlert}
                        title='Atenção'
                        text='Sub-Categoria adicionada com sucesso'
                        onConfirm={() => setShowConfirmAlert(false)}
                        didDestroy={() => setShowConfirmAlert(false)}
                        didClose={() => setShowConfirmAlert(false)}
                        icon='question'
                        allowOutsideClick={false}
                        allowEnterKey={false}
                        allowEscapeKey={false}
                        showLoaderOnConfirm={true}
                        showConfirmButton={true}
                        showCancelButton={true}
                    />
                 */
            }
            <div className='bg-white  lg:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full'>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col justify-center items-center space-y-8'>

                        <input
                            type="text"
                            placeholder='Descrição da Sub-categoria *'
                            className='px-4 py-2 border  rounded mx-2 w-52 lg:w-72 shadow'
                            {...register('subCategoria', {
                                required: { message: "Por favor, introduza a descrição do produto.", value: true },
                                minLength: { message: "Preenchimento obrigatório!", value: 5 },
                            })} />
                        <select
                            className='mt-4 px-4 py-2 border rounded mx-2 w-72 shadow cursor-pointer'
                            {...register('categoria', {
                                required: { message: "Por favor, introduza a Categoria.", value: true },
                                minLength: { message: "Preenchimento obrigatório!", value: 1 },
                            })}>
                            <option value="">Selecione a categoria</option>
                            <option value="1">Vigotas</option>
                            <option value="2">Conferragens</option>
                        </select>

                        <button
                            disabled={!isValid}
                            className='btn flex items-center space-x-2 shadow disabled:bg-blue-400 disabled:text-gray-300 disabled:cursor-not-allowed'>
                            <FaSave />
                            <span>Salvar</span>
                        </button>

                        <div className='text-red-700 mt-2 text-center'>

                            <p className='text-sm '>Os campos com * o seu preenchimento é de carácter obrigatório.</p>
                            <p className='text-sm '>{errors.subCategoria && (errors.subCategoria.message)}</p>
                            <p className='text-sm '>{errors.categoria && (errors.categoria.message)}</p>
                        </div>
                    </form>
                </div>
            </div>
            <div className='bg-white  flex-1 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar relative'>
                <div className='border-2 border-dashed rounded p-5 min-h-full overflow-auto '>
                    <h3 className='text-center font-bold mb-4'>Lista de Categorias</h3>
                    <ul>
                        <li
                            onClick={() => router.push('categoria/1')}
                            className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:font-bold  rounded p-2'
                        >Alvenaria
                        </li>
                        <li
                            onClick={() => router.push('categoria/2')}
                            className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:font-bold  rounded p-2'
                        >Pisos
                        </li>
                        <li
                            onClick={() => router.push('categoria/3')}
                            className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:font-bold  rounded p-2'
                        >Outros
                        </li>
                    </ul>
                    {/**Este botão novo vai chamar uma modal para inserir uma nova categoria */}
                    <button
                        onClick={() => setOpenModal(true)}
                        className='btn rounded-full py-4 px-4 absolute -top-1 right-1 cursor-pointer shadow'
                        title='Adicionar nova categoria'
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Categoria
