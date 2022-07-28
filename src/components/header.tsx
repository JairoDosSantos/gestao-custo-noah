import { NextPage } from "next";
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from "next/link";



const Header: NextPage = () => {
    return (
        <nav className="border-b">
            <div className="container mx-auto flex justify-between items-center">
                <Link href='/'>
                    <h1 className="font-extrabold text-lg text-blue-700 cursor-pointer">My <span className="text-red-500">Suppliers</span></h1>
                </Link>
                <ul className="flex text-sm">
                    <li className="hover:bg-gray-100 cursor-pointer p-5">
                        <Link href='/login'>Iniciar Sessão</Link>
                    </li>
                    <li className="group relative hover:bg-gray-100 cursor-pointer p-5">
                        <div className="flex space-x-2 items-center">
                            <span>Menu</span> <ChevronDownIcon className="w-5 h-5" />
                        </div>
                        <ul className="group-hover:flex group-hover:flex-col hidden  hover:flex w-44 shadow-xl shadow-gray-400 rounded-lg px-3 py-4 space-y-3 absolute top-14 -right-10">
                            <li className="hover:text-blue-700 ">Vistos recentemente</li>
                            <li className="hover:text-blue-700">Resumos das Reservas</li>
                        </ul>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Header;