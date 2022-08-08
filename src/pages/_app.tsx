import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/home/Header'
import Head from 'next/head'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import 'animate.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>

      <Header />
      <Head>
        <title>Sistema de gestão de preços por fornecedores</title>
        <link rel="icon" href='/noah.png' />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
