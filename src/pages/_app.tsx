import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/home/Header'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Head>
        <title>Sistema de gestão de preços por fornecedores</title>
        <link rel="icon" href='/noah.png' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
