import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import User from '../../assets/user.png'
import Logo from '../../assets/noah.png'

import { FaHome, FaList, FaUsers, FaFigma, FaSearch, FaSignOutAlt, FaMoneyBillWaveAlt } from 'react-icons/fa'

//Redux
//import { unwrapResult } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { update } from "../../redux/searchGeral"

import { useRouter } from "next/router"
import api from "../../service/api"

import nookies from 'nookies'

//Tipagem de ProdutoFornecedor
type ProdutoFornecedorType = {
    id: number;
    produto_id: number;
    fornecedor_id: number;
    precosimples: string;
    precotransporte: string;
    nomeuser: string;
    categoria: number;
    unidade: string;
    updated_at: string
}

const Header = () => {

    const route = useRouter()

    const [activo, setActivo] = useState(route.pathname);
    // const [showNotification, setShowNotification] = useState(false)

    const [search, setSearch] = useState('');
    const dispatch = useDispatch<any>();


    //const [isAuthed, setAuthStatus] = useState(false);
    const [emailUser, setEmailUser] = useState('')

    const [isAuth, setIsauth] = useState(false)



    /**
     * Método para buscar o usuário logado
     */
    const getUser = async () => {
        const cookie = nookies.get(null)
        const response = await api.get('api/getUser')
        const { user } = response.data

        if (user.USER_LOGGED) {
            const { email } = JSON.parse(user.USER_LOGGED)
            if (cookie.USER_LOGGED) {
                setIsauth(true)
                setEmailUser(email)

            }
        } else {
            setIsauth(false)
        }
        // setAuthStatus(false)
        return null
    }


    /**
     * Método para encerrar a sessão
     */

    const logOut = async () => {
        const response = await api.post('api/logout')

        //  console.log(response.data.logout)
        const { logout } = response.data
        if (logout) route.push('/')
    }

    useEffect(() => {

        getUser();
    }, [route.pathname]);

    search && dispatch(update({ description: search, page: 'Produto' }))

    //isAuthed
    return (
        <header className="bg-gray-50 text-black h-72">
            <div className={` ${isAuth ? 'flex flex-col' : 'hidden'}   py-2 px-8`}>
                <div>
                    <div className="flex justify-between items-center border-b border-gray-100">

                        <div className='print:hidden'>
                            <Image src={Logo} height={100} width={100} objectFit='contain' />
                        </div>
                        <div className="flex justify-end items-center gap-3">
                            <div className="print:flex hidden">
                                <Image src={Logo} height={100} width={100} objectFit='contain' />
                            </div>
                            <div className="flex print:hidden gap-3 relative items-center" >

                                {/**
                                *  
                                *  <button onClick={() => setShowNotification(!showNotification)}
                                    className={`cursor-pointer hover:brightness-75 relative ${!showNotification && 'animate__animated animate__pulse animate__infinite'} print:hidden`}
                                >
                                    <AiOutlineNotification />
                                    <span
                                        className={`hidden px-2 py-1 text-xs  bg-red-600 animate__animated animate__pulse animate__infinite  text-white rounded-full absolute bottom-2 right-2 
                                            ${showNotification ? 'hidden' : 'flex'}`}>
                                        3
                                    </span>
                                </button>
                                * <div className={`print:hidden w-96 h-40 shadow rounded px-2 py-3 bg-white absolute top-6 right-8 
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
                                */}
                                <Image
                                    src={User}
                                    className=' rounded-full'
                                    objectFit="cover"
                                    height={25}
                                    width={25}
                                    title={emailUser}
                                />
                                <FaSignOutAlt
                                    className='text-gray-400 text-lg cursor-pointer'
                                    title="Terminar Sessão"
                                    onClick={logOut}
                                />
                            </div>
                        </div>
                    </div >
                    <div className='flex lg:hidden print:hidden justify-between items-center'>
                        <FaList
                            title="Menú"
                        />
                        <button
                            className="btn rounded-full bg-gray-200"
                            title="Pesquisar"
                        >
                            <FaSearch />
                        </button>
                    </div>
                </div>
                <nav className='hidden lg:flex lg:justify-between  max-h-10 mt-4'>
                    <ul className="flex space-x-8 ">
                        <li
                            onClick={() => setActivo('/home')}
                            className={`link-menu ${activo.includes('/home') && 'actived'}`}>
                            <Link href='/home'>
                                <span className="flex items-center space-x-2">
                                    <FaHome /> <span>Painel de Controlo</span>
                                </span>
                            </Link>
                        </li>
                        <li
                            onClick={() => setActivo('/produto')}
                            className={`link-menu ${(activo.includes('/produto') || activo.includes('/todos-produtos')) && 'actived'}`}>
                            <Link href='/produto' >
                                <span className="flex items-center space-x-2">
                                    <FaList /><span>Produto</span>
                                </span>
                            </Link>
                        </li>
                        <li
                            onClick={() => setActivo('/lista-de-produto')}
                            className={`link-menu ${activo.includes('/lista-de-produto') && 'actived'}`}>
                            <Link href='/lista-de-produto'>
                                <span className="flex items-center space-x-2">
                                    <FaMoneyBillWaveAlt /><span>Cotações</span>
                                </span>
                            </Link>
                        </li>
                        <li
                            onClick={() => setActivo('/fornecedor')}
                            className={`link-menu ${activo.includes('/fornecedor') && 'actived'}`}>
                            <Link href='/fornecedor'>
                                <span className="flex items-center space-x-2">
                                    <FaUsers /> <span>Fornecedores</span>
                                </span>
                            </Link>
                        </li>
                        <li
                            onClick={() => setActivo('/categoria')}
                            className={`link-menu ${activo.includes('/categoria') && 'actived'}`}>
                            <Link href='/categoria'>
                                <span className="flex items-center space-x-2">
                                    <FaFigma /><span>Categoria</span>
                                </span>
                            </Link>
                        </li>
                    </ul>

                    <input
                        onChange={(event) => dispatch(update({ description: event.target.value, page: 'Produto' }))}
                        type='search'
                        placeholder="Pesquisar"
                        className=" text-black placeholder:text-gray-400 bg-gray-100 px-3 py-2 rounded w-[432px] "
                    />


                </nav>

            </div>
        </header >
    )
}



export default Header
