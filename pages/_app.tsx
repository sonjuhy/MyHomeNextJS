import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import {wrapper} from '@/lib/store'
import { PersistGate } from 'redux-persist/integration/react'

import {store, persistor} from '../lib/store'
// import {store} from '../lib/store'

import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'

// import React, {FC} from 'react';
// import {persistStore} from 'redux-persist'
// import {fetchSystem, wrapper} from '../store';

// const persistor = persistStore(store);

// const MyHomeApp:FC<AppProps> = function MyHomeApp({Component, pageProps}){
//   const {store, props} = wrapper.useWrappedStore(pageProps);
  
//   return(
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Component {...pageProps}/>
//       </PersistGate>
//     </Provider>
//   );
// }

// export default MyHomeApp;
function App({ Component, pageProps }: AppProps) {
  
  return <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
}
export default wrapper.withRedux(App);

