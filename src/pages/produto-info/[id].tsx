import Head from 'next/head'


import { useRouter } from 'next/router';
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa';

const InfoProduto = () => {

    const { query } = useRouter();
    const { id } = query
    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Informação sobre o Produto {id}</title>
            </Head>
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-y-auto overflow-hide-scroll-bar'>
                <div className=' border-2 border-dashed rounded px-5 py-3 min-h-full '>
                    <h3 className='text-center font-bold text-xl'>INFORMAÇÕES DO PRODUTO {id}</h3>
                    <div className='flex gap-4 justify-between'>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <label className='font-bold'>Nome : </label><span>Bloco de 12</span>
                            </div>
                            <div>
                                <label className='font-bold'>Preço símples : </label><span>1.200,00 AKWZ</span>
                            </div>
                            <div>
                                <label className='font-bold'>Preço C/transporte : </label><span>1.500,00 AKWZ</span>
                            </div>
                            <div>
                                <label className='font-bold'>Unidade : </label><span>cm</span>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Categorias a que pertence:</label>
                                <ul className='flex flex-col gap-3 mt-1 list-disc ml-8'>
                                    <li>Primeira </li>
                                    <li>Segunda </li>
                                    <li>Terceira</li>
                                </ul>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Fornecedores:</label>
                                <ul className='flex flex-col gap-3 mt-1 list-disc ml-8'>
                                    <li>Jairo dos Santos <span className='text-gray-400 text-xs'>- 1.200,00 AKWZ/m3 sem transporte- +244 929 84 89 58</span></li>
                                    <li>Manuel Rosário <span className='text-gray-400 text-xs'>- 1.500,00 AKWZ/caixa c/transporte- +244 929 84 89 58</span></li>
                                    <li>Wladimiro Carvalho <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/m3 sem transporte- +244 929 84 89 58</span></li>
                                    <li>Jairo Leandro <span className='text-gray-400 text-xs'>- 4.600,00 AKWZ/folha sem transporte- +244 929 84 89 58</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col align-top space-y-2'>

                            <div className='flex gap-3'>
                                <button className='flex space-x-2 items-center btn'>
                                    <FaEdit /> <span>Editar</span>
                                </button>
                                <button className='btn bg-green-400 flex space-x-2 items-center'>
                                    <FaPrint />
                                    <span>Imprimir</span>
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

export default InfoProduto
