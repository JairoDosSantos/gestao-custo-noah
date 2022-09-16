//Imagens do Perfil do fornecedor
import { FormEvent, useEffect, useId, useState } from 'react';
import Head from 'next/head'
//import Image from 'next/image'
import { useRouter } from 'next/router'

//import Fornecedor from '../assets/user.png'
import { FaSave } from 'react-icons/fa'

//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'

import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { update } from '../redux/searchGeral';
import { supabase } from '../utils/supabaseClient';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchFornecedores, insertFornecedor } from '../redux/fornecedorSlicee';
import Image from 'next/image';

import nookies from 'nookies';

//Imagens
import LoadImage from '../assets/load.gif';
import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest } from 'next';
import api from '../service/api';

const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })


//Tipagem
type FormValues = {
    id: number;
    nome_fornecedor: string;
    telefone1: string;
    telefone2: string;
    tipo_fornecedor: string;
    endereco: string;
    nomeUser: string

}

const fornecedor = () => {


    let control = 0;

    const router = useRouter()


    //Estados dos sweetAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    //load
    const [load, setLoad] = useState(false)


    const [fornecedores, setFornecedores] = useState<Array<FormValues>>([])

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const { description, page } = useSelector((state: RootState) => state.Search)

    const [inserted, setInserted] = useState('')

    const dispatch = useDispatch<any>()

    const onSubmit: SubmitHandler<FormValues> = async (datas) => {

        setLoad(true)
        const fornecedor = await dispatch(insertFornecedor(datas))
        setLoad(false)

        if (fornecedor.payload) {
            setShowConfirmAlert(true)
            setInserted(fornecedor.payload)
        } else {

            setInserted(fornecedor.payload)
            setShowErrorAlert(true)

        }

    }

    async function fetchAllFornecedores() {

        try {
            //setPending(true)
            const Fornecedores = await dispatch(fetchFornecedores())
            const TodosFornecedores = unwrapResult(Fornecedores)
            if (TodosFornecedores) {

                setFornecedores(TodosFornecedores)
            }
            // setPending(false)

        } catch (error) {
            //setPending(false)
            console.log(error)
        }

    }


    //if (description) {
    const filteredFornecedor = description ? fornecedores.filter((fornecedor) => fornecedor.nome_fornecedor.toLowerCase().includes(description.toLowerCase())) : []
    /**
     *    setFornecedores(filteredFornecedor)
   } else {
       fetchAllFornecedores();
   }
     */





    useEffect(() => {
        dispatch(update({ description, page: 'Fornecedor' }))
        fetchAllFornecedores()
    }, [inserted])

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
                text='Ocorreu um erro ao efectuar a operação. Por favor, verifique se o fornecedor já não está cadastrado no sistema!'
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

            <div className='bg-white w-full lg:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar '>
                <div className=' border-2 border-dashed rounded p-5 min-h-full animate__animated animate__fadeIn'>
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className='mb-4 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 justify-center align-center'>

                            <input
                                type="text"
                                placeholder='Nome do fornecedor *'
                                className='px-4 py-2 border  rounded mx-2 w-full lg:w-72 shadow'
                                {...register('nome_fornecedor', {
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
                                    min: { message: 'Por favor, insira um numéro de telefone válido', value: 900000000 }
                                })} />
                        </div>
                        <div className='mb-4 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 justify-center align-center '>

                            <input
                                type="number"
                                placeholder='Telefone 2 do fornecedor *'
                                className='px-4 py-2   rounded mx-2 w-full lg:w-72 shadow'
                                {...register('telefone2', {
                                    required: { message: "Por favor, introduza o número de telefone do fornecedor.", value: true },
                                    minLength: { message: "Número de telefone 2 incompleto!", value: 9 },
                                    min: { message: 'Por favor, insira um numéro de telefone 2 válido', value: 900000000 }
                                })} />

                            <select
                                {...register('tipo_fornecedor')}
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


                        <div className='flex justify-center items-center lg:justify-end lg:w-[590px] mx-auto'>
                            <button
                                disabled={!isValid || load}
                                className='btn flex items-center space-x-2 shadow disabled:bg-blue-500 disabled:text-gray-300 disabled:cursor-not-allowed'>
                                {
                                    load ? (
                                        <Image src={LoadImage} height={20} width={20} objectFit='cover' />
                                    ) : (

                                        <FaSave />
                                    )
                                }
                                <span>Salvar</span>
                            </button>
                        </div>
                        <div className='text-red-700 mt-2 text-center'>
                            <p className='text-sm '>Os campos com * o seu preenchimento é de carácter obrigatório.</p>

                            <p className='text-sm'>
                                {errors.nome_fornecedor && (errors.nome_fornecedor.message)}
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
            <div className='bg-white flex-1 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className='border-2 border-dashed rounded p-5 min-h-full overflow-auto animate__animated animate__fadeIn'>
                    <h3 className='text-center font-bold mb-4'>Lista de Fornecedores</h3>
                    <ul>
                        {
                            (fornecedores.length === 0) ? (<li className='text-center'>Não existem fornecedores na base de dados</li>) :
                                (fornecedores && fornecedores.length > 0) ? (
                                    fornecedores.map((fornecedor, index) => {

                                        if (index < 5) {
                                            return (
                                                <li
                                                    key={index} onClick={() => router.push(`fornecedor/${fornecedor.id}`)}
                                                    className='my-2 cursor-pointer text-black hover:bg-blue-600 hover:text-white rounded p-2'>
                                                    {fornecedor.nome_fornecedor} - <span className='text-gray-400 '>{fornecedor.endereco}</span>
                                                </li>
                                            )
                                        }
                                    })
                                ) : filteredFornecedor ? filteredFornecedor.map((fornecedor, index) => (
                                    <li
                                        key={index} onClick={() => router.push(`fornecedor/${fornecedor.id}`)}
                                        className='my-2 cursor-pointer text-black hover:bg-blue-600 hover:text-white rounded p-2'>
                                        {fornecedor.nome_fornecedor} - <span className='text-gray-400 '>{fornecedor.endereco}</span>
                                    </li>
                                )) : (
                                    <li className='text-center'>Fornecedores não encontrado na base de dados</li>
                                )


                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {


    const cookie = nookies.get(context)

    if (!cookie.USER_LOGGED) {
        // If no user, redirect to index.
        return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    // If there is a user, return it.
    return {
        props:
        {
            cookie
        }
    }
}



export default fornecedor