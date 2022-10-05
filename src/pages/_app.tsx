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
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <Component {...pageProps} />

    </Provider>
  )
}

export default MyApp
