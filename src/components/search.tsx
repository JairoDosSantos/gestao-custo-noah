import { NextPage } from 'next';
import { useState } from 'react';

const Search: NextPage = () => {

    const [category, setCategory] = useState('all')

    return (
        <section className='w-full bg-gray-100 p-8'>
            <div className='max-w-3xl mx-auto'>
                <div>
                    <ul className='flex items-center space-x-2'>
                        <li
                            onClick={() => setCategory('all')}
                            className={`search-category ${category === 'all' && 'search-category-selected'}`}
                        >
                            Todas as opções
                        </li>
                        <li
                            onClick={() => setCategory('service')}
                            className={`search-category ${category === 'service' && 'search-category-selected'}`}
                        >
                            Serviço
                        </li>
                        <li onClick={() => setCategory('product')}
                            className={`search-category ${category === 'product' && 'search-category-selected'}`}
                        >
                            Produto
                        </li>
                    </ul>
                </div>
                <div className='max-w-xl bg-white p-2 rounded-r-lg rounded-b-lg shadow-md'>
                    <form className='w-full flex justify-between space-x-2' >
                        <input type="text" className='w-96 px-2 caret-blue-600 ring-0 focus:ring-1 focus:ring-blue-600 focus:border-0 ' placeholder='Introduza o nome do produto ou serviço...' />
                        <button className='px-6 py-2 bg-blue-600 rounded-lg text-white font-bold hover:brightness-75'>Pesquisar</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Search;