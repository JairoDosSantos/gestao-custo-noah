import { FormEvent, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import User from '../../assets/user.png'
import Logo from '../../assets/noah.png'

import { AiOutlineNotification } from 'react-icons/ai'
import { FaHome, FaList, FaUsers, FaFigma, FaListAlt, FaSearch, FaTrash } from 'react-icons/fa'

//Redux
//import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { update } from "../../redux/searchGeral"
//Moment
import moment from 'moment'

/**
 * type SearchValue = {
    search: string
}
 */
//react-hook-form
//const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<SearchValue>({ mode: 'onChange' });

const Header = () => {

    const [activo, setActivo] = useState('home');
    const [showNotification, setShowNotification] = useState(false)

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    /**
     * 
     * 
        const Data1 = moment().format('l');
        const Data2 = moment('12/12/2022').format('l')
    
        const dta2 = Number((Data1.split('/'))[1])
        const dta = Number((Data2.split('/'))[1])
    
    
        //console.log(moment().format('l'))
        const data3 = dta - dta2;
        console.log(data3)
    
     */
    const handleSearch = (data: FormEvent) => {
        setSearch((data.target as HTMLInputElement).value)

        dispatch(update({ description: search, page: 'Produto' }))
    }

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
                        <button onClick={() => setShowNotification(!showNotification)}
                            className={`cursor-pointer hover:brightness-75 relative ${!showNotification && 'animate__animated animate__pulse animate__infinite'} print:hidden`}>
                            <AiOutlineNotification />
                            <span
                                className={`px-2 py-1 text-xs  bg-red-600 animate__animated animate__pulse animate__infinite  text-white rounded-full absolute bottom-2 right-2 
                                        ${showNotification ? 'hidden' : 'flex'}`}>
                                3
                            </span>
                        </button>
                        <div className={`print:hidden w-96 h-40 shadow rounded px-2 py-3 bg-white absolute top-6 right-8 
                                        ${showNotification ? 'flex flex-col gap-3 animate__animated animate__fadeIn ' : ' animate__animated animate__fadeOut'} `}>
                            <p
                                title="O produto z do fornecedor k actualizado há 4 semanas!"
                                className="text-xs truncate flex justify-between items-center"
                            >
                                O produto z do fornecedor k actualizado há 4 semanas! <FaTrash className="text-blue-700 cursor-pointer" />
                            </p>
                            <p
                                title="O produto z do fornecedor k actualizado há 4 semanas!"
                                className="text-xs truncate flex justify-between items-center"
                            >
                                O produto z do fornecedor k actualizado há 4 semanas! <FaTrash className="text-blue-700 cursor-pointer" />
                            </p>
                            <p
                                title="O produto z do fornecedor k actualizado há 4 semanas!"
                                className="text-xs truncate flex justify-between items-center"
                            >
                                O produto z do fornecedor k actualizado há 4 semanas! <FaTrash className="text-blue-700 cursor-pointer" />
                            </p>

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
                                <FaHome /> <span>Painel de Controlo</span>
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
                    <input
                        onChange={handleSearch}
                        type='search'
                        placeholder="Pesquisar"
                        className="placeholder:text-left text-black placeholder:text-gray-400 bg-gray-100 px-3 py-2 rounded-md w-[432px] ring-0 focus:ring-0" />
                </form>
            </nav >
            <div>

            </div>
        </header >
    )
}

export default Header
