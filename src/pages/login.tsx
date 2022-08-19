import { FormEvent, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
//import Link from 'next/link';




//External Components
//import { ChevronLeftIcon } from '@heroicons/react/solid';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook } from 'react-icons/io';


//Imagens
import Noah from '../assets/noah.png';
import { supabase } from '../utils/supabaseClient';
//Imagens
import LoadImage from '../assets/load.gif';
import { Auth } from '@supabase/ui';
import api from '../service/api';


type LoginType = {
    email: string;
    senha: string;
    id: number;
    nomeuser: string
}
type LoginProps = {
    usersPermitted: LoginType[]
}



const Login: NextPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [load, setLoad] = useState(false)
    const [showHide, setShowHide] = useState('hidden')
    const [showSuccess, setShowSuccess] = useState('hidden')

    const router = useRouter();

    const loadPermitted = async (email: string) => {
        const { data, error } = await supabase
            .from('permitted')
            .select('email,senha,nomeuser').filter('email', 'eq', email)


        if (data && data.length > 0) {
            return true
        } else {
            return false
        }
    }


    const logOut = async () => {
        const response = await api.post('api/logout')

        if (response.data) {
            console.log(response.data)
        }

    }


    const signInUser = async (event: FormEvent) => {

        event.preventDefault();

        setLoad(true)

        const response = await api.post('api/login', {
            email: email,
            password: password
        })

        setLoad(false)

        const { user } = response.data
        const status = response.status

        if (user) {
            setShowSuccess('flex')
            router.push('/home')
            // window.location.href = '/home';
        } else if (status === 401) {
            setShowHide('flex')
        }
        //setShowHide('flex')
        // setShowSuccess('hidden')

        setLoad(false)
    };



    return (
        <main className='max-w-3xl mx-auto  shadow-lg shadow-gray-300 bg-white p-5 rounded -mt-20 animate__animated animate__fadeIn'>
            <div className='container  mx-auto w-24  items-center space-x-60'>

                <Image src={Noah} className='w-42' objectFit='cover' />
            </div>
            <div className='container flex flex-col justify-center ml-3 mt-4'>
                <h1 className='text-xl font-semibold'>Inicie sessão</h1>
                <h2 className='text-lg font-extralight'>Insira o seu e-mail e a senha para começar</h2>
            </div>

            <div className='container mt-4 flex space-x-2'>
                <div className='border-r p-6 w-1/2'>
                    <form className='flex flex-col' onSubmit={signInUser}>
                        <label htmlFor="email" className='font-bold'>E-mail</label>
                        <input
                            onChange={(event) => { setEmail(event.target.value); event.target.value === '' && setShowHide('hidden') }}
                            type="email"
                            id='email'
                            className='px-4 py-2 caret-blue-600 border mt-2 mb-4'
                            placeholder='Insira o seu melhor email'
                        />
                        <label htmlFor="password" className='font-bold'>Password</label>
                        <input
                            onChange={(event) => { setPassword(event.target.value); event.target.value === '' && setShowHide('hidden') }}
                            type="password"
                            id='password'
                            className='px-4 py-2 caret-blue-600 border mt-2 mb-4'
                            placeholder='Insira a sua password'
                        />
                        <button type='submit' className='bg-sky-700 text-white font-bold px-4 py-2 flex items-center justify-center gap-2'>
                            {
                                load && (
                                    <Image src={LoadImage} height={20} width={20} objectFit='cover' />
                                )
                            }
                            <span>Seguinte</span>
                        </button>
                        <div className={`px-4 py-3 mt-2  flex justify-center border border-red-400 text-red-400 font-bold ${showHide}`}>Você não tem permissão para aceder o sistema.</div>
                        <div className={`px-4 py-3 mt-2  flex justify-center border border-green-400 text-green-400 font-bold shadow-sm ${showSuccess}`}>Login efectuado com sucesso.</div>
                    </form>
                </div>
                <div className='p-6 w-1/2'>
                    <h1 className='font-semibold'>Ou aceda ao "sistema" com outra conta</h1>
                    <div className='space-y-2 mt-2'>
                        <button className='login-social-btn' onClick={logOut}>
                            <FcGoogle className='w-6 h-6' />
                            <span>Continuar com o Google</span>
                        </button>
                        <button className='login-social-btn'>
                            <IoLogoFacebook className='w-6 h-6 text-blue-600' />
                            <span>Continuar com o Facebook</span>
                        </button>
                    </div>
                </div>
            </div>
        </main >
    )
}


export const getServerSideProps: GetServerSideProps = async () => {


    const { data } = await supabase
        .from('permitted')
        .select('email,senha,nomeuser').limit(5)


    return {
        props: {
            usersPermitted: data
        }
    }
}

export default Login;