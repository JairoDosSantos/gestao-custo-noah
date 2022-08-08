//import { useState } from "react";
import { NextPage } from "next";
import { Combobox } from "@headlessui/react";
//import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

type Data = {
    id: string;
    description: string
}

type AutoCompletaProps = {
    data: Array<Data>;
    placeholder: string;
    newProduto: (value: string) => void
    value: string;
    setValuePadrao: (value: string) => void;
    setValue: (value: string) => void

}

const AutoCompleta: NextPage<AutoCompletaProps> = ({ data, placeholder, newProduto, value, setValuePadrao, setValue }: AutoCompletaProps) => {

    //const [value, setValue] = useState('')

    const filteredSearchs = value
        ? data.filter((produto) => produto.description.toLowerCase().includes(value?.toLowerCase()))
        : []

    const handleChange = (description: Data) => {
        //setValue(description)
        //  console.log(description.description)
        setValuePadrao(description.description)
        setValue('')
    }
    if (value && filteredSearchs.length === 0) {
        setValuePadrao(value)
        newProduto(value)
    }
    const router = useRouter()

    return (
        <>

            {/**
                *  <input
                    type="text"
                    placeholder={placeholder}
                    className='px-4 py-2 border  rounded mx-2 w-full shadow'
                />
            */}

            <div
                className="relative  w-full  overflow-hidden text-left align-middle transition-all transform ">

                <Combobox
                    value=''
                    as="div"
                    onChange={handleChange}
                    className='relative ring-0 focus:ring-0 divide-y divide-gray-100 overflow-hidden'>
                    <>
                        <div className='flex items-center px-1 py-4 w-full '>
                            <Combobox.Input
                                className='w-full  text-sm bg-white rounded  shadow'
                                onChange={(event) => {
                                    setValue(event.target.value)
                                }}
                                placeholder={placeholder} />
                        </div>
                        {filteredSearchs.length > 0 && (
                            <Combobox.Options static className='py-4 text-sm max-h-96 overflow-y-auto z-50'>
                                {/**         <SearchIcon className='h-6 w-6 space-x-1 text-gray-500/75' /> */}
                                {filteredSearchs.map((Search, index) => (

                                    <Combobox.Option key={index} value={Search}>
                                        {({ active }) => (
                                            <div
                                                className={`px-4 py-2 space-x-1 ${active
                                                    ? 'bg-gray-600 rounded-xl text-white'
                                                    : 'bg-white'}`}>
                                                <span
                                                    className={`font-medium hover:cursor-pointer ${active
                                                        ? 'text-white'
                                                        : 'text-gray-900'}`}>{`${Search.id} - ${Search.description}`}
                                                </span>

                                            </div>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}

                    </>

                </Combobox>
            </div>

        </>
    )
}


export default AutoCompleta;