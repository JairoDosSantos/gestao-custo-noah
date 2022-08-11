import { FormEvent, Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux';
import { fetchAllProdutos } from '../redux/produtoSlice';
import { unwrapResult } from '@reduxjs/toolkit';


type PessoasType = {
    id: number;
    descricao: string;
    unidade: string;
    subcategory_id: string;
    nomeUser: string
}

type AutoCompleteProps = {
    setProduto: (produtoName: string) => void;
    setIdProduto: (id: number) => void
}




export default function AutoCompleteProduto({ setProduto, setIdProduto }: AutoCompleteProps) {

    const [selected, setSelected] = useState({ id: 0, descricao: '', unidade: '', subcategory_id: '', nomeUser: '' } as PessoasType)
    const [query, setQuery] = useState('')


    const [produtList, setProduts] = useState<Array<PessoasType>>([])
    //Todos os Produtos cujo ID é 0, logo deverá se criar um novo produto


    const dispatch = useDispatch<any>();


    const fetchProduto = async () => {
        const produts = await dispatch(fetchAllProdutos());
        const todosProduts = unwrapResult(produts)
        if (todosProduts) {

            setProduts(todosProduts)
        }
    }

    const handleChange = (event: FormEvent) => {
        event.preventDefault();
        const queryValue = event.target as HTMLInputElement
        if (queryValue.value !== '') {
            setSelected({ id: 0, descricao: '', unidade: '', subcategory_id: '', nomeUser: '' })
            setQuery(queryValue.value);
            setProduto(queryValue.value)

            setIdProduto(0)
        }
    }

    useEffect(() => {
        const produto = selected.descricao;
        if (produto !== '' || selected.id !== 0) {
            setProduto(produto)
            setIdProduto(selected.id)

        } else {
            setProduto(query)
        }
        fetchProduto()
    }, [selected])


    //const createProduto = () => setProduto('Novo Produto');

    const filteredPeople =
        query === ''
            ? produtList
            : produtList.filter((person) =>
                person.descricao
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <div className="w-full">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1 py-1 px-2">
                    <div
                        className="relative w-full cursor-default overflow-hidden text-left 
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 
                        focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            placeholder='Descrição do Produto'
                            className="w-full border bg-white rounded py-3  shadow leading-5 text-gray-900 "
                            displayValue={(person: PessoasType) => person.descricao || query}
                            onChange={handleChange}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"

                    >
                        <Combobox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 
                            ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700 hidden">

                                </div>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-400 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person.descricao}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-gray-400'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
