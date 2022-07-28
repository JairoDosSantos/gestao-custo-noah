import { NextPage } from 'next';
import Link from 'next/link';


//External Components
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook } from 'react-icons/io';
import Router from 'next/router';


const Login: NextPage = () => {
    return (
        <main className='max-w-3xl mx-auto shadow-lg shadow-gray-300 mt-5 p-5 rounded'>
            <div className='container flex items-center space-x-60'>
                <Link href='/'>
                    <ChevronLeftIcon className='w-8 h-8 cursor-pointer' />
                </Link>
                <h1 className='text-blue-700 font-bold text-2xl'>My <span className='text-red-500'>Suppliers</span></h1>
            </div>
            <div className='container flex flex-col justify-center ml-3 mt-4'>
                <h1 className='text-xl font-semibold'>Inicie sessão/crie uma conta</h1>
                <h2 className='text-lg font-extralight'>Insira o seu e-mail para começar</h2>
            </div>

            <div className='container mt-4 flex space-x-2'>
                <div className='border-r p-6 w-1/2'>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='font-bold'>E-mail</label>
                        <input
                            type="email"
                            id='email'
                            className='px-4 py-2 caret-blue-600 border mt-2 mb-4'
                            placeholder='Insira o seu melhor email'
                        />

                        <button onClick={() => Router.push('/dashboard')} className='bg-sky-700 text-white font-bold px-4 py-2'>Seguinte</button>
                    </div>
                </div>
                <div className='p-6 w-1/2'>
                    <h1 className='font-semibold'>Ou aceda ao "My suppliers" com outra conta</h1>
                    <div className='space-y-2 mt-2'>
                        <button className='login-social-btn'>
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

export default Login;