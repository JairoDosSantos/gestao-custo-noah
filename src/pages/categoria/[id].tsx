import { useRouter } from "next/router"
import { useState } from "react";

import Head from "next/head"

import { FaEdit, FaTrash, FaFigma } from "react-icons/fa"

import dynamic from 'next/dynamic';
const SweetAlert2 = dynamic(() => import('react-sweetalert2'), { ssr: false })

import EditarCategoriaModal from "../../components/categoria/ModalCategoriaEdit";
import { supabase } from "../../utils/supabaseClient";
import { GetStaticProps } from "next";
import { deleteCategoria } from "../../redux/categoriaSlices";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";


//Tipagem
type CategoryType = {
    id: number;
    descricao: string;
    created_at: string;
    nomeuser: string
}
type SubCategoryType = {
    id: number;
    descricao: string;
}
type CategoryProps = {
    categoria: CategoryType;
    subcategoria: SubCategoryType[]
}

type PromiseDelete = {
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean
}


const CategoriaItem = ({ categoria, subcategoria }: CategoryProps) => {


    //Estados do Modal de Edição
    const [openModal, setOpenModal] = useState(false);

    //Estados dos sweetAlerts
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [showQuestionAlert, setShowQuestionAlert] = useState(false)


    const route = useRouter();

    const dispatch = useDispatch<any>();

    const removeCategoria = async () => {

        const categoriaRemovida = await dispatch(deleteCategoria(categoria.id))
        const removido = unwrapResult(categoriaRemovida)
        if (removido) {
            setShowConfirmAlert(true)

            setTimeout(() => {
                route.push('/categoria')
            }, 2000)

            // route.push('/categoria')

        } else {
            setShowErrorAlert(true)
        }

    }

    /**
     *    const ConfirmedRemove = async (result: PromiseDelete) => {
   
           if (result.isConfirmed) {
               removeCategoria(categoria.id)
   
               setTimeout(() => {
                   route.push('/categoria')
               }, 5000)
           }
       }
     */

    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Categoria {categoria?.descricao}</title>
            </Head>

            {/** Edit Modal */}
            <EditarCategoriaModal data={categoria} isOpen={openModal} setIsOpen={setOpenModal} />

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
                text='Tem a certeza que deseja efectuar esta operação ?'
                icon='question'
                onConfirm={removeCategoria}
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
                    <h3 className='text-center font-bold text-xl'>Informações da categoria {categoria?.id}</h3>
                    <div className='flex gap-4 justify-between'>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <label className='font-bold'>ID : </label><span>{categoria?.id}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Descrição : </label><span>{categoria?.descricao}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Data de cadastro : </label><span>{categoria?.created_at}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Cadastrado por : </label><span>{categoria?.nomeuser}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Sub-Categorias : </label>
                                <ul className="ml-6">
                                    {
                                        subcategoria && subcategoria.map((sub, index) => (
                                            <li key={index} className='list-disc'> {sub.descricao}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center space-y-2'>
                            <FaFigma className="h-44 w-44 text-gray-400" />
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

export const getStaticPaths = async () => {

    const { data, error } = await supabase
        .from('categoria')
        .select('*')

    const paths = data ? data.map(categoria => ({ params: { id: JSON.stringify(categoria.id) } })) : { params: { id: '' } }

    return {
        paths,
        fallback: true
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {


    const { data } = await supabase
        .from('categoria')
        .select('*')
        .filter('id', 'eq', params?.id)
        .single()

    const datas = await supabase
        .from('subcategoria')
        .select('id,descricao,category_id(id,descricao)')
        .filter('category_id', 'eq', params?.id)

    const subcategoria = datas.data

    return {
        props: {
            categoria: data,
            subcategoria: subcategoria
        }
    }
}


export default CategoriaItem
