import Image from 'next/image'
import Head from 'next/head'
import { FaSave, FaPlus } from 'react-icons/fa'

import { useRouter } from 'next/router'
const Categoria = () => {

    const router = useRouter()

    return (
        <div className='-mt-20 p-5 flex lg:flex-row flex-col gap-3'>
            <Head>
                <title>Criar Categoria</title>
            </Head>
            <div className='bg-white  lg:w-2/3 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded p-5 min-h-full'>
                    <form className='flex flex-col justify-center items-center space-y-8'>

                        <input required type="text" placeholder='Descrição da Sub-categoria *' className='px-4 py-2 border  rounded mx-2 w-52 lg:w-72 shadow' />

                        <button className='btn flex items-center space-x-2 shadow'>
                            <FaSave />
                            <span>Salvar</span>
                        </button>

                        <div className='text-red-700 mt-2 text-center hidden'>

                            <p className='text-sm '>Os campos com * o seu preenchimento é de carácter obrigatório.</p>
                        </div>
                    </form>
                </div>
            </div>
            <div className='bg-white  flex-1 p-5 rounded shadow-md max-h-96 overflow-auto overflow-hide-scroll-bar relative'>
                <div className='border-2 border-dashed rounded p-5 min-h-full overflow-auto '>
                    <h3 className='text-center font-bold mb-4'>Lista de Categorias</h3>
                    <ul>
                        <li
                            onClick={() => router.push('categoria/1')}
                            className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:font-bold  rounded p-2'
                        >Alvenaria
                        </li>
                        <li
                            onClick={() => router.push('categoria/2')}
                            className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:font-bold  rounded p-2'
                        >Pisos
                        </li>
                        <li
                            onClick={() => router.push('categoria/3')}
                            className='my-2 cursor-pointer hover:bg-blue-600 hover:text-white hover:font-bold  rounded p-2'
                        >Outros
                        </li>
                    </ul>
                    {/**Este botão novo vai chamar uma modal para inserir uma nova categoria */}
                    <button
                        onClick={() => alert('Você clicou em adicionar uma nova categoria. Uma modal será aberta em breve')}
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

export default Categoria
