//Imagens do Perfil do fornecedor
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Fornecedor from '../assets/user.png'
import { FaSave } from 'react-icons/fa'

const fornecedor = () => {

    const router = useRouter()


    return (
        <div className='-mt-20 p-5 flex flex-col lg:flex-row gap-3'>
            <Head>
                <title>Criar Fornecedor</title>
            </Head>
            <div className='bg-white w-full lg:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full'>
                    <form>

                        <div className='mb-4 flex flex-col lg:flex-row items-center space-y-2'>
                            <input type="text" placeholder='Nome do fornecedor *' className='px-4 py-2 border  rounded mx-2 w-72' />
                            <input type="number" placeholder='Telefone 1 do fornecedor *' className='px-4 py-2 border  rounded mx-2 w-72' />
                            <label htmlFor='logoFornecedor' className='cursor-pointer ml-auto hidden lg:flex'>
                                <Image src={Fornecedor} height={75} width={75} objectFit={'cover'} className='rounded' />
                            </label>
                            <input type={'file'} className='hidden' id='logoFornecedor' />

                        </div>
                        <div className='mb-4 flex flex-col lg:flex-row items-center space-y-2'>

                            <input type="number" placeholder='Telefone 2 do fornecedor *' className='px-4 py-2 border  rounded mx-2 w-72' />

                            <select className='px-4 py-2 border rounded mx-2 w-72 cursor-pointer'>
                                <option className='text-gray-400'>Categorias</option>
                                <option>AREIA</option>
                                <option>SOLOS</option>
                                <option>GEOTÊXTEIS</option>
                            </select>
                        </div>
                        <div className='mb-4 flex flex-col lg:flex-row items-center'>
                            <textarea rows={3} cols={77} className='px-4 py-2 border  rounded mx-2 ' placeholder='Endereço '></textarea>
                        </div>


                        <div className='flex justify-start'>
                            <button className='btn flex items-center space-x-2'>
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
        </div>
    )
}

export default fornecedor
