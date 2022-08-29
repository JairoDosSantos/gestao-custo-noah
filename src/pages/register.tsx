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

    const loadPermitted = async (email: string) => {

        const { data, error } = await supabase
            .from('permitted')
            .select('*')
            .match({ email })
            .single()

        if (data) {
            return true
        } else {
            return false
        }
    }

    //   const { user: UserAuth, session } = Auth.useUser()


    const router = useRouter();


    const signUpUser = async (event: FormEvent) => {

        event.preventDefault();

        setLoad(true)

        const hasCount = await loadPermitted(email);
        console.log(hasCount)
        if (hasCount) {
            setShowHide('hidden')



            // console.log({ session, user, error })
            const response = await api.post('api/register', {
                email: email,
                password: password
            })

            setLoad(false)

            if (response.data) setShowSuccess('flex')
        } else {
            setShowHide('flex')
            setShowSuccess('hidden')
        }
        setLoad(false)
    };



    return (
        <main className='max-w-3xl mx-auto  shadow-lg shadow-gray-300 bg-white p-5 rounded -mt-20 animate__animated animate__fadeIn'>
            <div className='container  mx-auto w-24  items-center space-x-60'>

                <Image src={Noah} className='w-42' objectFit='cover' />
            </div>
            <div className='container flex flex-col justify-center ml-3 mt-4 items-center'>
                <h1 className='text-xl font-semibold'>Crie uma conta de utilizador</h1>
                <h2 className='text-lg font-extralight'>Insira o seu e-mail e senha para começar</h2>
            </div>

            <div className='container mt-4 flex justify-center items-center'>
                <div className='border-r border-l p-6 w-1/2'>
                    <form className='flex flex-col' onSubmit={signUpUser}>
                        <label htmlFor="email" className='font-bold'>E-mail</label>
                        <input
                            onChange={(event) => { setEmail(event.target.value); event.target.value === '' && setShowHide('hidden') }}
                            type="email"
                            id='email'
                            className='px-4 py-2 caret-blue-600 border mt-2 mb-4'
                            placeholder='Insira o seu melhor email'
                        />
                        <label htmlFor="email" className='font-bold'>Password</label>
                        <input
                            onChange={(event) => { setPassword(event.target.value); event.target.value === '' && setShowHide('hidden') }}
                            type="password"
                            id='password'
                            className='px-4 py-2 caret-blue-600 border mt-2 mb-4'
                            placeholder='Insira a senha de utilizador'
                        />
                        <button type='submit' className='bg-sky-700 text-white font-bold px-4 py-2 flex items-center justify-center gap-2'>
                            {
                                load && (
                                    <Image src={LoadImage} height={20} width={20} objectFit='cover' />
                                )
                            }
                            <span>Seguinte</span>
                        </button>
                        <div className={`px-4 py-3 mt-2 text-center border border-red-400 text-red-400 font-bold ${showHide}`}>Você não tem permissão para aceder o sistema</div>
                        <div className={`px-4 py-3 mt-2 text-center border border-green-400 text-green-400 font-bold shadow-sm ${showSuccess}`}>Usuário criado com sucesso.</div>
                    </form>
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