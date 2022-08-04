import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaEdit } from 'react-icons/fa'




//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'
//Notificações toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


type EditarModalProps = {
    isOpen: boolean,
    setIsOpen: (valor: boolean) => void
}

type FormValues = {
    descricaoMaterial: string;
    subCategoria: string;
    unidade: string;
}

export default function EditarProdutoModal({ isOpen, setIsOpen }: EditarModalProps) {

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = (data) => { console.log(data); }


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
        setIsOpen(false)
    }

    return (
        <>
            {
                /**
                 * <div className="fixed inset-0 flex items-center justify-center">
                        <button
                        type="button"
                        onClick={openModal}
                        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                        Open dialog
                        </button>
                    </div>
                 */
            }


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
                                        Edição dos dados do produto
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
                                                    className='rounded shadow w-1/2'
                                                    placeholder='Descrição do produto *'
                                                    {...register('descricaoMaterial', {
                                                        required: { message: "Por favor, introduza a descrição do projecto.", value: true },
                                                        minLength: { message: "Preenchimento obrigatório!", value: 1 },

                                                    })}
                                                />
                                                {/**Adicionar um auto complete component para categoria ou um select*/}
                                                {/**  <input type="text" className='rounded shadow w-1/2' placeholder='Sub-Categoria do produto *' /> */}
                                                <select
                                                    className=' border  w-1/2 rounded  shadow cursor-pointer'
                                                    {...register('subCategoria', {
                                                        required: { message: "Por favor, introduza a subCategoria.", value: true },
                                                        minLength: { message: "Preenchimento obrigatório!", value: 1 },
                                                    })}>

                                                    <option value="">Selecione a Sub-Categoria *</option>
                                                    <option value="1">Vigotas</option>
                                                    <option value="2">Conferragens</option>
                                                </select>
                                            </div>
                                            <div className='flex gap-2 justify-center align-center'>
                                                <select
                                                    {...register('unidade', {
                                                        required: { message: "Por favor, introduza a subCategoria.", value: true },
                                                        minLength: { message: "Preenchimento obrigatório!", value: 1 },
                                                    })}
                                                    className='rounded shadow w-full cursor-pointer'>
                                                    <option value="#">Unidade</option>
                                                    <option value="m">cm</option>
                                                    <option value="cm">m</option>
                                                    <option value="cm3">cm3</option>
                                                    <option value="m3">m3</option>
                                                </select>
                                            </div>

                                            <div className="mt-4 flex justify-end ">
                                                <button
                                                    disabled={!isValid}
                                                    type="button"
                                                    className="flex align-center justify-center gap-2 rounded-md border border-transparent 
                          bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                          focus-visible:ring-offset-2 disabled:bg-blue-400 disabled:text-gray-200 disabled:cursor-not-allowed"
                                                    onClick={notifyError}
                                                >
                                                    <FaEdit />
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
