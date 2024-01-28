import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import {wrapper} from '@/lib/store'
import { PersistGate } from 'redux-persist/integration/react'

import {store, persistor} from '../lib/store'

import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'

import router from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '@/components/loading/Loading'


function App({ Component, pageProps }: AppProps) {
  
  return <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
}
export default wrapper.withRedux(App);

