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

//Tipagem
type FormValues = {
    categoria: string
}



export default function EditarCategoriaModal({ isOpen, setIsOpen }: EditarModalProps) {
    //let [isOpen, setIsOpen] = useState(true)

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<FormValues> = (data) => { console.log(data); }

    const notify = () => toast.success('Categoria alterada com sucesso! 😁', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })

    const notifyError = () => toast.error('Erro ao efectuar a operação! 😥', {
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
                                        Edição dos dados de categoria
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col  justify-center">
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
                                        <form className='flex flex-col gap-3 justify-center align-center w-[552px] mx-auto' onSubmit={handleSubmit(onSubmit)}>
                                            <div className='flex gap-2 justify-center align-center'>
                                                <input type="text" className='rounded shadow w-full' placeholder='Descrição da categoria *'
                                                    {...register('categoria', {
                                                        required: { message: "Por favor, introduza a descrição da categoria.", value: true },
                                                        minLength: { message: "Preenchimento obrigatório!", value: 5 },
                                                    })} />

                                            </div>

                                            <div className="mt-4 flex justify-end ">
                                                <button
                                                    disabled={!isValid}
                                                    type="button"
                                                    className="flex align-center justify-center gap-2 rounded-md border border-transparent 
                          bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500  disabled:bg-blue-400 disabled:text-gray-200 disabled:cursor-not-allowed
                          focus-visible:ring-offset-2"
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
                </Dialog>
            </Transition>
        </>
    )
}