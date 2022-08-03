import Head from 'next/head';
import Image from 'next/image';


import Perfil from '../../assets/user.png'

import EditarModal from '../../components/fornecedor/EditarModal';

import { useRouter } from 'next/router';


import { FaEdit, FaTrash, FaUser } from 'react-icons/fa'
import { useState } from 'react';

const FornecedorInfo = () => {

    const { query } = useRouter();
    const { id } = query
    const [showModal,setShowModal]=useState(false)
    
    return (
        <div className='-mt-20 p-5 flex gap-3'>
            <Head>
                <title>Fornecedor {id}</title>
            </Head>
            <EditarModal isOpen={showModal} setIsOpen = {setShowModal}/>
            
          
            <div className='bg-white  w-full p-5 rounded shadow-md max-h-96 overflow-auto overflow-y-hidden'>
                <div className=' border-2 border-dashed rounded px-5 py-3 min-h-full overflow-y-auto'>
                    <h3 className='text-center font-bold text-xl'>INFORMAÇÕES DO FORNECEDOR {id}</h3>
                    <div className='flex gap-4 justify-between'>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <label className='font-bold'>Nome : </label><span>Jairo dos Santos</span>
                            </div>
                            <div>
                                <label className='font-bold'>Telefone 1 : </label><span>+244 929-84-89-58</span>
                            </div>
                            <div>
                                <label className='font-bold'>Telefone 2 : </label><span>+244 928-30-80-96</span>
                            </div>
                            <div>
                                <label className='font-bold'>Endereço : </label><span>Benfica, espaço girafa.</span>
                            </div>
                            <div>
                                <label className='font-bold mb-2'>Fornecedor de:</label>
                                <ul className='flex flex-col space-y-2 list-disc ml-8'>
                                    <li>Brita <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/m3 sem transporte</span></li>
                                    <li>Mosaico cerâmico <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/caixa c/transporte</span></li>
                                    <li>Tubos <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/m3 sem transporte</span></li>
                                    <li>Pladur <span className='text-gray-400 text-xs'>- 4.600,00 AKWZ/folha sem transporte</span></li>
                                    <li>Portas <span className='text-gray-400 text-xs'>- 3.600,00 AKWZ/m3 c/transporte</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center space-y-2'>

                            <FaUser className='h-44  w-44 text-gray-200' />
                            <div className='flex gap-3'>
                                <button className='flex space-x-2 items-center btn shadow cursor-pointer' onClick={()=>setShowModal(true)}>
                                    <FaEdit /> <span>Editar</span>
                                </button>
                                <button className='flex space-x-2 items-center btn shadow bg-gray-200 text-black'>
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

export default FornecedorInfo
