import { useRouter } from "next/router"

import Head from "next/head"
import { FaEdit, FaTrash, FaFigma } from "react-icons/fa"

const CategoriaItem = () => {
    const { query } = useRouter()
    const { id } = query
    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Categoria {id}</title>
            </Head>
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-y-hidden'>
                <div className=' border-2 border-dashed rounded px-5 py-3 min-h-full overflow-y-auto'>
                    <h3 className='text-center font-bold text-xl'>Informações da categoria {id}</h3>
                    <div className='flex gap-4 justify-between'>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <label className='font-bold'>Descrição : </label><span>SOLOS</span>
                            </div>
                            <div>
                                <label className='font-bold'>Data de cadastro : </label><span>25 de julho de 2022</span>
                            </div>
                            <div>
                                <label className='font-bold'>Cadastrado por : </label><span>Jairo dos Santos</span>
                            </div>

                        </div>
                        <div className='flex flex-col justify-center space-y-2'>
                            <FaFigma className="h-44 w-44" />
                            <div className='flex gap-3'>
                                <button className='flex space-x-2 items-center btn'>
                                    <FaEdit /> <span>Editar</span>
                                </button>
                                <button className='flex space-x-2 items-center btn bg-gray-200 text-black'>
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

export default CategoriaItem
