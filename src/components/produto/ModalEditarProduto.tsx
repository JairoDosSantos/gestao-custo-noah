import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'

//Imagens
import LoadImage from '../../assets/load.gif';

//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'

//Notificações toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { updateProduto } from '../../redux/produtoSlice'
import Image from 'next/image';


//Tipagem do Produto
type ProddutoType = {
    id: number;
    descricao: string;
    nomeuser: string;
    //    unidade: string;
    //sub_category_id: CategoryType;
}

type EditarModalProps = {
    isOpen: boolean,
    setIsOpen: (valor: boolean) => void
    data: ProddutoType
}

type FormValues = {
    descricaoMaterial: string;
    subCategoria: string;
    unidade: string;
}

export default function EditarProdutoModal({ isOpen, setIsOpen, data }: EditarModalProps) {

    const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm<FormValues>({ mode: 'onChange' });

    useEffect(() => {
        reset()
    }, [data])

    const dispatch = useDispatch<any>();
    const [load, setLoad] = useState(false)
    //const [produto, setProduto] = useState({} as ProddutoType)



    const onSubmit: SubmitHandler<FormValues> = async (datas) => {
        setLoad(true)
        const result = await dispatch(updateProduto({ id: data.id, nomeuser: data.nomeuser, descricaoMaterial: datas.descricaoMaterial }))
        setLoad(false)
        if (result.payload) {

            notify();
            setTimeout(function () {
                closeModal()
            }, 6500);

        } else {
            notifyError();
        }


    }

    //console.log(data)

    const notify = () => toast.success('Alteração efectuada com sucesso!😁', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })

    const notifyError = () => toast.error('Erro ao efectuar operação! 😥', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })

    function closeModal() {
        reset()
        setIsOpen(false)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-gray-900 text-center mb-5"
                                    >
                                        Edição de produto
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col gap-2  justify-center">
                                        <div className='w-[552px]'>
                                            <ToastContainer
                                                position='top-center'
                                                autoClose={5000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                            />
                                        </div>
                                        <form
                                            className='flex flex-col gap-3 justify-center align-center w-[552px] mx-auto'
                                            onSubmit={handleSubmit(onSubmit)}>

                                            <div className='flex gap-2 justify-center align-center'>
                                                <input
                                                    type="text"
                                                    className='rounded shadow w-full'
                                                    placeholder='Descrição do produto *'
                                                    {...register('descricaoMaterial', {
                                                        required: { message: "Por favor, introduza a descrição do projecto.", value: true },
                                                        minLength: { message: "Preenchimento obrigatório!", value: 1 },
                                                    })}
                                                    defaultValue={data.descricao}
                                                />
                                                {/**Adicionar um auto complete component para categoria ou um select*/}

                                            </div>


                                            <div className="mt-4 flex justify-end ">
                                                <button
                                                    disabled={!isValid}
                                                    className="flex align-center justify-center gap-2 rounded-md border border-transparent 
                          bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                          focus-visible:ring-offset-2 disabled:bg-blue-400 disabled:text-gray-200 disabled:cursor-not-allowed"
                                                >
                                                    {
                                                        load ? (
                                                            <Image src={LoadImage} height={20} width={20} objectFit='cover' />
                                                        ) : (

                                                            <FaEdit />
                                                        )
                                                    }
                                                    <span>Salvar</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog >
            </Transition >
        </>
    )
}
