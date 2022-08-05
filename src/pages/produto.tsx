import Head from 'next/head'
//import Image from 'next/image'

//Imagens do Perfil do fornecedor
//import Fornecedor from '../assets/user.png'

import { FaList, FaSave } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useState } from 'react'


//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'

import dynamic from 'next/dynamic'
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })


//Tipagem
type FormValues = {
    descricaoMaterial: string;
    precoSimples: number;
    precoTransporte: number;
    categoria: string;
    fornecedor: number;
    unidade: string;
}

const Produto = () => {

    const router = useRouter()

    //Estados dos sweetsAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = (data) => { console.log(data); setShowConfirmAlert(true) }

    return (
        <div className='-mt-20 p-5 flex flex-col sm:flex-row gap-3'>
            <Head>
                <title>Novo Produto</title>
            </Head>


            {/**Confirm alert**/}
            <SweetAlert2
                backdrop={true}
                show={showConfirmAlert}
                title='Sucesso'
                text='Novo produto criado com sucesso!'
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
                text='Ocorreu um erro ao efectuar a operação!'
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
                confirmButtonColor="#4051ef"
            />


            <div className='bg-white w-full  sm:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between'>
                            {/** Aquí virá um autocomplete component para descrição do material */}
                            <input
                                type="text"
                                placeholder='Descrição do Material *'
                                className='px-4 py-2 border  rounded mx-2 w-full shadow'
                                id='descricaoMaterial'
                                {...register('descricaoMaterial', {
                                    required: { message: "Por favor, introduza a descrição do produto.", value: true },
                                    minLength: { message: "Preenchimento obrigatório!", value: 3 },
                                })} />
                        </div>
                        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between'>
                            <select
                                {...register('categoria')}
                                className='px-4 py-2 border rounded w-full lg:mx-2 lg:w-72  cursor-pointer shadow' >
                                <option value="">... Sub-categoria ...</option>
                                <option value="Solos">Solos</option>
                                <option value="Areia">Areia</option>
                            </select>

                            <input
                                type="number"
                                placeholder='Preço com transporte'
                                className='px-4 py-2 border  rounded w-full mx-0 lg:mx-2 lg:w-72 shadow'
                                id='precoTransporte'
                                {...register('precoTransporte', {
                                    min: { message: 'Por favor, insira um preço válido', value: 0 }
                                })} />

                        </div>
                        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0  items-center justify-between'>
                            <select
                                {...register('unidade')}
                                className='mt-4 px-4 py-2 border rounded w-full lg:mx-2 lg:w-72 shadow cursor-pointer'>
                                <option value="#">... Unidade ...</option>
                                <option value="cm">cm</option>
                                <option value="m">m</option>
                                <option value="m3">m3</option>
                            </select>

                            <input
                                type="number"
                                placeholder='Preço Símples *'
                                className='px-4 py-2 border  rounded w-full lg:mx-2 lg:w-72 shadow'
                                id='precoSimples'
                                {...register('precoSimples', {
                                    required: { message: "Por favor, introduza o preço do produto.", value: true },
                                    minLength: { message: "Preenchimento obrigatório!", value: 3 },
                                    min: { message: 'Por favor, insira um preço válido', value: 0 }

                                })} />

                        </div>
                        <div className='flex flex-col sm:flex-row justify-end gap-3 mt-4'>
                            <button type='button' onClick={() => router.push('/todos-produtos')}
                                className='btn bg-gray-200 text-black flex space-x-2 items-center shadow'>
                                <FaList />
                                <span>Lista de Produtos</span>
                            </button>
                            <button
                                //onClick={() => { setShowConfirmAlert(true) }}
                                type='submit'
                                disabled={!isValid}
                                className='btn flex justify-center align-center space-x-2 items-center shadow
                                 disabled:bg-blue-500 disabled:text-gray-300 disabled:cursor-not-allowed text-center'>
                                <FaSave />
                                <span>Salvar</span>
                            </button>
                        </div>
                        <div className='text-red-700 mt-2 text-center'>

                            <p className='text-sm '>Os campos com * o seu preenchimento é de carácter obrigatório.</p>
                            <p className='text-sm '> {errors.descricaoMaterial && (errors.descricaoMaterial.message)}</p>
                            <p className='text-sm '> {errors.precoSimples && (errors.precoSimples.message)}</p>
                        </div>
                    </form>
                </div>
            </div >
            <div className='bg-white  flex-1 p-5 rounded shadow-md max-h-96 overflow-hide-scroll-bar'>
                <div className='border-2 border-dashed rounded p-5 min-h-full'>
                    <h3 className='text-center font-bold mb-4'>Lista de Fornecedores</h3>
                    <ul>
                        <li className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white  selected-item rounded p-2'>Fulano - <span className='text-gray-400 truncate'>Maianga. AREIA, SOLOS...</span></li>
                        <li className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white  rounded p-2'>Cicrano - <span className='text-gray-400'>Cazenga. FUMIGAÇÃO DE SOLOS, TELA PLÁSTICA...</span></li>
                        <li className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white  rounded p-2'>Beltrano - <span className='text-gray-400'>Rangel. GEOTÊXTEIS...</span></li>

                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Produto
