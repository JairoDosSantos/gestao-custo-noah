//Imagens do Perfil do fornecedor
import { FormEvent, useState } from 'react';
import Head from 'next/head'
//import Image from 'next/image'
import { useRouter } from 'next/router'

//import Fornecedor from '../assets/user.png'
import { FaSave } from 'react-icons/fa'

//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'

import dynamic from 'next/dynamic';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })


//Tipagem
type FormValues = {
    nomeFornecedor: string;
    telefone1: number;
    telefone2: number;
    tipoFornecedor: string;
    endereco: number;
}

const fornecedor = () => {

    const router = useRouter()


    //Estados dos sweetAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)


    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = (data) => { console.log(data); setShowConfirmAlert(true) }

    return (
        <div className='-mt-20 p-5 flex flex-col lg:flex-row gap-3'>
            <Head>
                <title>Criar Fornecedor</title>
            </Head>

            {/**Confirm alert**/}
            <SweetAlert2
                backdrop={true}
                show={showConfirmAlert}
                title='Sucesso'
                text='Novo fornecedor criado com sucesso!'
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

            <div className='bg-white w-full lg:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full'>
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className='mb-4 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 justify-center align-center'>

                            <input
                                type="text"
                                placeholder='Nome do fornecedor *'
                                className='px-4 py-2 border  rounded mx-2 w-full lg:w-72 shadow'
                                {...register('nomeFornecedor', {
                                    required: { message: "Por favor, introduza o nome do fornecedor.", value: true },
                                    minLength: { message: "Preenchimento obrigatório!", value: 1 },
                                })} />

                            <input
                                type="number"
                                placeholder='Telefone 1 do fornecedor *'
                                className='px-4 py-2 border  rounded mx-2 w-full lg:w-72 shadow'
                                {...register('telefone1', {
                                    required: { message: "Por favor, introduza o número de telefone do fornecedor.", value: true },
                                    minLength: { message: "Número de telefone 1 incompleto!", value: 9 },
                                })} />

                            {
                                /**  
                                 * <label htmlFor='logoFornecedor' className='cursor-pointer ml-auto hidden lg:flex'>
                                     <Image src={Fornecedor} height={75} width={75} objectFit={'cover'} className='rounded' />
                                   </label>
                                    <input type={'file'} className='hidden' id='logoFornecedor' />
                                 */
                            }

                        </div>
                        <div className='mb-4 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 justify-center align-center'>

                            <input
                                type="number"
                                placeholder='Telefone 2 do fornecedor *'
                                className='px-4 py-2   rounded mx-2 w-full lg:w-72 shadow'
                                {...register('telefone2', {
                                    required: { message: "Por favor, introduza o número de telefone do fornecedor.", value: true },
                                    minLength: { message: "Número de telefone 2 incompleto!", value: 9 },
                                })} />

                            <select
                                {...register('tipoFornecedor')}
                                className='px-4 py-2 border rounded mx-2 w-full lg:w-72 cursor-pointer shadow'>
                                <option className='text-gray-400'>Tipo de Fornecedor</option>
                                <option>Nacional</option>
                                <option>Internacional</option>
                                <option>UBV</option>
                            </select>
                        </div>
                        <div className='mb-4 flex flex-col lg:flex-row items-center justify-center align-center'>
                            <textarea
                                {...register('endereco', {
                                    required: { message: "Por favor, introduza o endereço do fornecedor.", value: true },
                                    minLength: { message: "Preenchimento obrigatório!", value: 5 },
                                })}
                                rows={3}
                                cols={77}
                                className='px-4 py-2 border  rounded mx-2 shadow w-full lg:w-[590px]'
                                placeholder='Endereço '></textarea>
                        </div>


                        <div className='flex justify-center lg:justify-end lg:w-[660px]'>
                            <button
                                disabled={!isValid}
                                className='btn flex items-center space-x-2 shadow disabled:bg-blue-300 disabled:text-gray-400 disabled:cursor-not-allowed'>
                                <FaSave />
                                <span>Salvar</span>
                            </button>
                        </div>
                        <div className='text-red-700 mt-2 text-center'>
                            <p className='text-sm '>Os campos com * o seu preenchimento é de carácter obrigatório.</p>

                            <p className='text-sm'>
                                {errors.nomeFornecedor && (errors.nomeFornecedor.message)}
                            </p>
                            <p className='text-sm'>
                                {errors.telefone1 && (errors.telefone1.message)}
                            </p>
                            <p className='text-sm'>
                                {errors.telefone2 && (errors.telefone2.message)}
                            </p>
                            <p className='text-sm'>
                                {errors.endereco && (errors.endereco.message)}
                            </p>
                        </div>
                    </form>
                </div>
            </div >
            <div className='bg-white   p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className='border-2 border-dashed rounded p-5 min-h-full overflow-auto'>
                    <h3 className='text-center font-bold mb-4'>Lista de Fornecedores</h3>
                    <ul>
                        <li onClick={() => router.push('fornecedor/1')} className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white rounded p-2'>Fulano - <span className='text-gray-400 truncate'>Maianga. AREIA, SOLOS...</span></li>
                        <li onClick={() => router.push('fornecedor/2')} className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white rounded p-2'>Cicrano - <span className='text-gray-400'>Cazenga. FUMIGAÇÃO DE SOLOS, TELA PLÁSTICA...</span></li>
                        <li onClick={() => router.push('fornecedor/3')} className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white rounded p-2'>Beltrano - <span className='text-gray-400'>Rangel. GEOTÊXTEIS...</span></li>
                        <li onClick={() => router.push('fornecedor/4')} className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white rounded p-2'>Fulano - <span className='text-gray-400 truncate'>Maianga. AREIA, SOLOS...</span></li>
                        <li onClick={() => router.push('fornecedor/5')} className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white rounded p-2'>Cicrano - <span className='text-gray-400'>Cazenga. FUMIGAÇÃO DE SOLOS, TELA PLÁSTICA...</span></li>

                    </ul>
                </div>
            </div>
        </div >
    )
}

export default fornecedor
