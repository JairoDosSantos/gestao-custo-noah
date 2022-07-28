import Head from 'next/head'
import Image from 'next/image'

//Imagens do Perfil do fornecedor
import Fornecedor from '../assets/user.png'

import { FaList, FaSave } from 'react-icons/fa'
import { useRouter } from 'next/router'


const Produto = () => {

    const router = useRouter()


    return (
        <div className='-mt-20 p-5 flex flex-col sm:flex-row gap-3'>
            <Head>
                <title>Criar Produto</title>
            </Head>
            <div className='bg-white w-full  sm:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full'>
                    <form >
                        <div className='my-2 flex sm:justify-end justify-center'>
                            <Image src={Fornecedor} height={50} width={50} className='rounded-full' />
                        </div>
                        <div className='mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between'>
                            <input type="text" placeholder='Descrição do Material *' className='px-4 py-2 border  rounded mx-2 w-72' />
                            <input type="number" placeholder='Preço Símples *' className='px-4 py-2 border  rounded mx-2 w-72' />
                        </div>
                        <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center justify-between'>
                            <select className='px-4 py-2 border rounded mx-2 w-72 cursor-pointer'>
                                <option value="">... Categoria ...</option>
                                <option value="">Solos</option>
                                <option value="">Areia</option>
                            </select>
                            <select className='px-4 py-2 border rounded mx-2 w-72 cursor-pointer'>
                                <option value="#">... Unidade ...</option>
                                <option value="">cm</option>
                                <option value="">m</option>
                                <option value="">m3</option>
                            </select>
                        </div>
                        <div className='mt-4 flex flex-col sm:flex-row items-center justify-between'>
                            <input type="number" placeholder='Preço com transporte' className='px-4 py-2 border  rounded mx-2 w-72' />
                        </div>

                        <div className='flex flex-col sm:flex-row justify-end gap-3'>
                            <button type='button' onClick={() => router.push('/todos-produtos')}
                                className='btn bg-gray-200 text-black flex space-x-2 items-center'>
                                <FaList />
                                <span>Lista de Produtos</span>
                            </button>
                            <button className='btn flex space-x-2 items-center'>
                                <FaSave />
                                <span>Salvar</span>
                            </button>
                        </div>
                        <div className='text-red-700 mt-2 text-center'>

                            <p className='text-sm hidden'>Os campos com * o seu preenchimento é de carácter obrigatório.</p>
                        </div>
                    </form>
                </div>
            </div>
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
        </div>
    )
}

export default Produto
