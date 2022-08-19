import { Dialog, Transition } from '@headlessui/react'
import { FormEvent, Fragment, useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

//Componentes Externos
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { deleteProdutoFornecedor, updatePrecoFornecedor } from '../../redux/produtoSlice'
import { useRouter } from 'next/router'
import { unwrapResult } from '@reduxjs/toolkit'

//Imagens
import LoadImage from '../../assets/load.gif';
import Image from 'next/image'
import { insertUpdatePreco, insertUpdatePrecoRefactored } from '../../redux/painelSlice'

//Tipagens
type FormValues = {
    precosimples: string;
    precotransporte: string;
    unidade: string;
}

type FornecedorType = {
    id: number;
    fornecedor_id: number
    produto_id: number;
    precosimples: string;
    precotransporte: string;
    nomeuser: string;
    categoria: number;
    unidade: string;

}

type EditarModalProps = {
    isOpen: boolean,
    setIsOpen: (valor: boolean) => void
    data: FornecedorType;
    setData: (objecto: FornecedorType) => void
}

//Tipagem de relatorio Gráfico
type RelatorioProdutoType = {
    id: number;
    inserted_at: string;
    updated_at: string;
    produtofornecedor_id: number;
    precosimples_antigo: number;
    precotransporte_antigo: number
}

export default function ModalEditarProdutoPorFornecedor({ isOpen, setIsOpen, data, setData }: EditarModalProps) {

    const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

    const dispatch = useDispatch<any>();
    const [precosimples, setPrecoSimples] = useState(data.precosimples);
    const [precotransporte, setprecoTransporte] = useState(data.precotransporte);


    const [load, setLoad] = useState(false)
    const [loadDelete, setLoadDelete] = useState(false)

    const watchtransporte = (watch().precotransporte);
    const watchSimples = (watch().precosimples);


    const route = useRouter();

    const removeProdutoFornecedor = async (id: number) => {

        setLoadDelete(true)
        const produtoFornecedorRemovido = await dispatch(deleteProdutoFornecedor(id))
        const removido = unwrapResult(produtoFornecedorRemovido);


        setLoadDelete(false);



        if (removido) {
            notify()
            setTimeout(() => {
                closeModal()
            }, 6500)

        } else {
            notifyError()
        }


    }


    const onSubmit: SubmitHandler<FormValues> = async (datas) => {

        // Inciar o load
        setLoad(true)
        const updated_at = (new Date()).toDateString();
        //Actualiza o preço primeiro do produto
        const result = await dispatch(updatePrecoFornecedor({ ...data, precosimples: String(datas.precosimples), precotransporte: String(datas.precotransporte), updated_at }))
        const resultUnwrap = unwrapResult(result)

        //console.log(data.fornecedor_id)
        //console.log(data.produto_id)
        //console.log(data.precosimples)
        //Pegar o ID do preco/produto que foi cadastrado, e inserir na tabela do relatório gráfico
        //console.log(datas.precosimples)
        //console.log(data.precosimples)
        //console.log(resultUnwrap)
        if (resultUnwrap) {
            if (Number(datas.precosimples) !== Number(data.precosimples)) {
                //  const relatorioInserted = await dispatch(insertUpdatePreco({ precosimples_antigo: data.precosimples, precotransporte_antigo: data.precotransporte, produtofornecedor_id: resultUnwrap[0].id }))
                const relatorioInserted = await dispatch(insertUpdatePrecoRefactored({ precosimples_antigo: data.precosimples, fornecedor_id: data.fornecedor_id, produto_id: data.produto_id }))
                const reportUnwrap = unwrapResult(relatorioInserted)
                //  console.log(reportUnwrap)
                //Encerrar o load
                setLoad(false)

                if (reportUnwrap) {
                    if (result.payload) {
                        notify()
                        setTimeout(function () {
                            closeModal()
                        }, 6500);
                    } else {
                        notifyError()
                    }
                }
            } else {
                //Encerrar o load
                setLoad(false)


                if (result.payload) {
                    notify()
                    setTimeout(function () {
                        closeModal()
                    }, 6500);
                } else {
                    notifyError()
                }

            }
        } else {
            notifyError()
        }


    }


    const notify = () => toast.success('Operação efectuada com sucesso!😁', {
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


    useEffect(() => {
        reset()
    }, [data])

    useEffect(() => {
        setPrecoSimples(data.precosimples)
        setprecoTransporte(data.precotransporte)
    }, [])

    function closeModal() {
        reset()
        setIsOpen(false)
    }


    const changePrice = (priceType: string, event: FormEvent) => {
        if (priceType === 'simples') {
            const simples = ((event.target as HTMLInputElement).value)
            setPrecoSimples(simples);

        }

    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 " onClose={closeModal}>
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
                                        Edição dos preços do produto de Fornecedor
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col justify-center">
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
                                                <div className='flex flex-col gap-2  '>
                                                    <div>
                                                        <label >Preço s/transporte</label>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        min={0}
                                                        placeholder='Preço Símples'
                                                        className='border  rounded w-full shadow'
                                                        {...register('precosimples', {
                                                            min: { message: 'Por favor, insira um preço válido', value: 0 },
                                                        })}
                                                        defaultValue={data?.precosimples}
                                                    />
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <div>
                                                        <label >Preço c/transporte</label>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        min={0}
                                                        placeholder='Preço com transporte'
                                                        className='px-4 py-2 border  rounded w-full shadow'
                                                        {...register('precotransporte', {
                                                            min: { message: 'Por favor, insira um preço válido', value: 0 },
                                                        })}
                                                        defaultValue={data?.precotransporte}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-end">
                                                <div className="mt-4 flex gap-3">
                                                    <button
                                                        title='Salvar alterações'
                                                        className="flex align-center justify-center gap-2 rounded-md border border-transparent 
                          bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                          focus-visible:ring-offset-2"
                                                    >
                                                        {
                                                            load ? (
                                                                <Image src={LoadImage} height={25} width={25} objectFit='cover' />
                                                            ) : (

                                                                <FaEdit />
                                                            )
                                                        }
                                                        <span>Salvar</span>
                                                    </button>
                                                    <button
                                                        title='Apagar produto do fornecedor'
                                                        type="button"
                                                        className="flex align-center justify-center gap-2 rounded-md border border-transparent 
                          bg-gray-400 px-4 py-2 text-sm font-bold text-black hover:brightness-75
                          focus:outline-none focus-visible:ring-2
                          focus-visible:ring-offset-2 "
                                                        onClick={() => removeProdutoFornecedor(data.id)}
                                                    >
                                                        {
                                                            loadDelete ? (
                                                                <Image src={LoadImage} height={25} width={25} objectFit='cover' />
                                                            ) : (
                                                                <FaTrashAlt />
                                                            )
                                                        }
                                                        <span>Apagar</span>
                                                    </button>
                                                </div>
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

