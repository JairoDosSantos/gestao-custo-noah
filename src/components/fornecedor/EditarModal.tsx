import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaEdit } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//Componentes Externos
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateFornecedor } from '../../redux/fornecedorSlicee'
import { unwrapResult } from '@reduxjs/toolkit'
import Image from 'next/image'

//Imagens
import LoadImage from '../../assets/load.gif';


type EditarModalProps = {
  isOpen: boolean,
  setIsOpen: (valor: boolean) => void;
  data: FormValues
}

//Tipagem
type FormValues = {
  id: number;
  nome_fornecedor: string;
  telefone1: number;
  telefone2: number;
  tipo_fornecedor: string;
  endereco: string;
  nomeuser: string;
}


export default function EditarModal({ isOpen, setIsOpen, data }: EditarModalProps) {

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormValues>({ mode: 'onChange' });

  const dispatch = useDispatch<any>();
  const [load, setLoad] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (datas) => {
    setLoad(true)
    const result = await dispatch(updateFornecedor(
      {
        id: data.id,
        endereco: datas.endereco,
        nome_fornecedor: datas.nome_fornecedor,
        nomeUser: data.nomeuser,
        telefone1: String(datas.telefone1),
        telefone2: String(datas.telefone2),
        tipo_fornecedor: datas.tipo_fornecedor
      })
    )

    const resultUnwrap = unwrapResult(result)
    setLoad(false)

    if (resultUnwrap) {
      notify();
      setTimeout(function () {
        setIsOpen(false)
      }, 6500);
    } else {
      notifyError();
    }

  }


  function closeModal() {
    setIsOpen(false)
  }

  const notify = () => toast.success('Fornecedor alterado com sucesso! 😁', {
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
                    Edição dos dados do fornecedor
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
                        <input
                          type="text"
                          className='rounded shadow w-1/2'
                          placeholder='Nome do fornecedor *'
                          {...register('nome_fornecedor', {
                            required: { message: "Por favor, introduza o nome do fornecedor.", value: true },
                            minLength: { message: "Preenchimento obrigatório!", value: 1 },
                          })}
                          defaultValue={data?.nome_fornecedor}
                        />

                        <input
                          type="text"
                          className='rounded shadow w-1/2'
                          placeholder='Telefone 1 do fornecedor *'
                          {...register('telefone1', {
                            required: { message: "Por favor, introduza o número de telefone do fornecedor.", value: true },
                            minLength: { message: "Número de telefone 1 incompleto!", value: 9 },
                            min: { message: 'Por favor, insira um numéro de telefone válido', value: 900000000 }
                          })}
                          defaultValue={data?.telefone1}
                        />
                      </div>
                      <div className='flex gap-2 justify-center align-center'>
                        <input
                          type="text"
                          className='rounded shadow w-1/2'
                          placeholder='Telefone 2 do fornecedor *'
                          {...register('telefone2', {
                            required: { message: "Por favor, introduza o número de telefone do fornecedor.", value: true },
                            minLength: { message: "Número de telefone 2 incompleto!", value: 9 },
                            min: { message: 'Por favor, insira um numéro de telefone 2 válido', value: 900000000 }
                          })}
                          defaultValue={data?.telefone2}
                        />

                        <select
                          {...register('tipo_fornecedor')}
                          defaultValue={data?.tipo_fornecedor}
                          className='rounded shadow w-1/2 cursor-pointer'>
                          <option value="#">Tipo de fornecedor</option>
                          <option value="Nacional">Nacional</option>
                          <option value="Internacional">Internacional</option>
                          <option value="UBV">UBV</option>
                        </select>
                      </div>
                      <div className='flex gap-2 justify-center align-center'>
                        <textarea
                          {...register('endereco')}
                          defaultValue={data?.endereco}
                          rows={3}
                          cols={58}
                          className='px-4 py-2 rounded shadow w-full'
                          placeholder='Endereço '></textarea>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          disabled={!isValid}
                          className="flex items-center justify-center gap-2 rounded-md border border-transparent 
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
