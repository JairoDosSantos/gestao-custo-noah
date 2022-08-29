import { useEffect, useState } from 'react';


import { useRouter } from 'next/router'
import Head from 'next/head'

import dynamic from 'next/dynamic';

import { FaSave, FaPlus } from 'react-icons/fa'
import NovaCategoriaModal from '../components/categoria/ModalNovaCategoria';

//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'


//Imagens
import LoadImage from '../assets/load.gif';


//INSTALAR O yarn add -D @types/sweetalert2-react
//import SweetAlert2 from 'react-sweetalert2';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })


import { useDispatch } from 'react-redux';
import { fetchcategorias, insertSubcategoria } from '../redux/categoriaSlices';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { update } from '../redux/searchGeral';
import Image from 'next/image';
import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest } from 'next';

import nookies from 'nookies';


//Tipagem
type FormValues = {
    id: number;
    subCategoria: string;
    categoria: number
}

type CategoryAttribute = {
    id: number;
    descricao: string;
}

const Categoria = () => {

    const router = useRouter()

    //Show and Hide Load gif
    const [load, setLoad] = useState(false)

    //Estados do Modal de Edição
    const [openModal, setOpenModal] = useState(false);

    //Estados dos sweetAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)

    const dispatch = useDispatch<any>()

    //Variável para controlar a busca da requisição das categorias
    const [actualizaListaCategoria, setActualizaListCategoria] = useState('')


    const { description, page } = useSelector((state: RootState) => state.Search)


    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = async (datas) => {
        setLoad(true)
        const categoryInserted = await dispatch(insertSubcategoria(datas))
        setLoad(false)
        if (categoryInserted.payload) {
            setShowConfirmAlert(true)
        } else {
            setShowErrorAlert(true)
        }

    }

    const [categories, setCategories] = useState<Array<CategoryAttribute>>([])



    async function fetchAllFornecedores() {

        try {
            //setPending(true)
            const Categorias = await dispatch(fetchcategorias())
            const TodasCategorias = unwrapResult(Categorias)
            if (TodasCategorias) {

                setCategories(TodasCategorias)
            }
            // setPending(false)

        } catch (error) {
            //setPending(false)
            console.log(error)
        }

    }

    const searchProductByDescriptioAndFornecedor = () => {

        if (description) {
            const filteredCategory = categories.filter((category) => category.descricao.toLowerCase().includes(description.toLowerCase()))
            setCategories(filteredCategory)
        } else {
            fetchAllFornecedores();
        }

    }


    useEffect(() => {
        dispatch(update({ description, page: 'Categoria' }))
        fetchAllFornecedores()
    }, [actualizaListaCategoria])

    useEffect(() => {
        searchProductByDescriptioAndFornecedor()
    }, [description])




    return (
        <div className='-mt-20 p-5 flex lg:flex-row flex-col gap-3'>
            <Head>
                <title>Criar Categoria</title>
            </Head>

            {/** Edit Modal */}
            <NovaCategoriaModal
                setActualizaListCategoria={setActualizaListCategoria}
                isOpen={openModal}
                setIsOpen={setOpenModal}
            />


            {/**Confirm alert**/}
            <SweetAlert2
                backdrop={true}
                show={showConfirmAlert}
                title='Sucesso'
                text='Operação efectuada com sucesso'
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
            <div className='bg-white  lg:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full animate__animated animate__fadeIn'>
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
                            <option value="">Selecione a sua categoria *</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.descricao}</option>
                            ))}
                        </select>
                        <div className='w-72 flex justify-end aling-middle'>

                            <button
                                disabled={!isValid || load}
                                className='btn flex items-center space-x-2 shadow disabled:bg-blue-400 disabled:text-gray-300 disabled:cursor-not-allowed'>
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
                            <p className='text-sm '>{errors.subCategoria && (errors.subCategoria.message)}</p>
                            <p className='text-sm '>{errors.categoria && (errors.categoria.message)}</p>
                        </div>
                    </form>
                </div>
            </div>
            <div className='bg-white  flex-1 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar relative'>
                <div className='border-2 border-dashed rounded p-5 min-h-full overflow-auto animate__animated animate__fadeIn'>
                    <h3 className='text-center font-bold mb-4'>Lista de Categorias</h3>
                    <ul>
                        {
                            categories.length > 0 ? (
                                categories.map((category, index) => {
                                    if (index < 5) {
                                        return (
                                            <li
                                                key={category.id}
                                                onClick={() => router.push(`categoria/${category.id}`)}
                                                className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:font-bold  rounded p-2'
                                            >{category.descricao}
                                            </li>
                                        )
                                    }
                                })
                            ) : (
                                <li className='text-center'>Não existem categorias cadastradas na sua base de dados</li>
                            )
                        }

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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

    // const { user } = await supabase.auth.api.getUserByCookie(req)
    //const session = supabase.auth.session()
    //const res = await api.get('api/getUser');

    //const { user } = res.data;
    const cookie = nookies.get(context)
    //console.log(session)
    //  const { user: UserAuth, session: S } = Auth.useUser()
    //console.log(UserAuth)
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

export default Categoria
