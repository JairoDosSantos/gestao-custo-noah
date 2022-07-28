import { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import User from '../../assets/user.png'
import Logo from '../../assets/noah.png'

import { AiOutlineNotification } from 'react-icons/ai'
import { FaHome, FaList, FaUsers, FaFigma, FaListAlt, FaSearch } from 'react-icons/fa'

const Header = () => {

    const [activo, setActivo] = useState('home');
    const [showNotification, setShowNotification] = useState(false)

    return (
        <header className="bg-gray-50 text-black h-72  py-2 px-8">
            <div className="flex justify-between print:justify-end items-center border-b border-gray-100">
                <div className="print:hidden">
                    <Image src={Logo} height={100} width={100} objectFit='contain' />
                </div>
                <div className="flex justify-end items-center gap-3 ">
                    <div className="print:inline-block hidden">
                        <Image src={Logo} height={100} width={100} objectFit='contain' />
                    </div>
                    <div className="print:hidden flex gap-3 relative">
                        <button onClick={() => setShowNotification(!showNotification)} className="cursor-pointer hover:brightness-75 relative animate-bounce print:hidden">
                            <AiOutlineNotification />
                            <span
                                className={`px-2 py-1 text-xs  bg-red-600 animate-pulse text-white rounded-full absolute bottom-2 right-2 ${showNotification ? 'hidden' : 'flex'}`}>
                                3
                            </span>
                        </button>
                        <div className={`print:hidden w-80 h-40 shadow rounded px-2 py-3 bg-white absolute top-6 right-8 ${showNotification ? 'flex flex-col gap-3' : 'hidden'} `}>
                            <span className="text-xs truncate">O produto x do fornecedor y actualizado há 2 semanas!</span>
                            <span className="text-xs truncate">O produto z do fornecedor k actualizado há 4 semanas!</span>
                            <span className="text-xs truncate">O produto y do fornecedor x actualizado há 8 semanas!</span>
                        </div>
                        <Image src={User} className=' rounded-full' objectFit="cover" height={25} width={25} />
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden justify-between items-center print:hidden ">
                <FaList />
                <button className="btn rounded-full bg-gray-200">
                    <FaSearch />
                </button>
            </div>
            <nav className="py-5 hidden lg:flex justify-between items-center">
                <ul className="flex space-x-8 ">
                    <li onClick={() => setActivo('home')} className={`link-menu ${activo === 'home' && 'actived'}`}>
                        <Link href='/home'>
                            <span className="flex items-center space-x-2">
                                <FaHome /> <span>Página Inicial</span>
                            </span>
                        </Link>
                    </li>
                    <li onClick={() => setActivo('produto')} className={`link-menu ${activo === 'produto' && 'actived'}`}>
                        <Link href='/produto' >
                            <span className="flex items-center space-x-2">
                                <FaList /><span>Produto</span>
                            </span>
                        </Link>
                    </li>
                    <li onClick={() => setActivo('produtolista')} className={`link-menu ${activo === 'produtolista' && 'actived'}`}>
                        <Link href='/lista-de-produto'>
                            <span className="flex items-center space-x-2">
                                <FaListAlt /><span>Produtos</span>
                            </span>
                        </Link>
                    </li>
                    <li onClick={() => setActivo('fornecedor')} className={`link-menu ${activo === 'fornecedor' && 'actived'}`}>
                        <Link href='/fornecedor'>
                            <span className="flex items-center space-x-2">
                                <FaUsers /> <span>Fornecedores</span>
                            </span>
                        </Link>

                    </li>
                    <li onClick={() => setActivo('categoria')} className={`link-menu ${activo === 'categoria' && 'actived'}`}>
                        <Link href='/categoria'>
                            <span className="flex items-center space-x-2">
                                <FaFigma /><span>Categoria</span>
                            </span>
                        </Link>
                    </li>
                </ul>
                <form>
                    <input type='search' placeholder="Pesquisar" className="placeholder:text-left text-black placeholder:text-gray-400 bg-gray-100 px-3 py-2 rounded-md w-[432px] ring-0 focus:ring-0" />
                </form>
            </nav>
            <div>

            </div>
        </header>
    )
}

export default Header
