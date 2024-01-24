import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import {wrapper} from '@/lib/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import {store, persistor} from '../lib/store'

import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import { FC } from 'react'


function App({ Component, pageProps }: AppProps) {
  // const {store, props} = wrapper.useWrappedStore(pageProps);
  return <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
}
export default wrapper.withRedux(App);

