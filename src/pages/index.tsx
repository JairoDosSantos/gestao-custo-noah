import type { NextPage } from 'next'

//My Components
import Search from '../components/search'
import Login from './login'

const Home: NextPage = () => {
  return (
    <main>
      {/**
      *  <section className='max-w-3xl mx-auto pt-16 mb-4 flex items-center space-x-8'>
            <h1 className='text-3xl text-red-500 font-extrabold'><span className='text-blue-700'>My</span> Suppliers</h1>
            <div className='border-l p-10'>
              <h1 className='font-semibold text-xl'>Ofertas dos seus fornecedores favoritos</h1>
              <p className='text-sm'>
                Pesquise um produto, serviço específico ou até mesmo um local famoso!</p>
            </div>
          </section>
          <Search />
      */}
      <Login />
    </main>
  )
}

export default Home
