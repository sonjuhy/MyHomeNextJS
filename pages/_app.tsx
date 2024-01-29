import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.css'
import {Providers} from '@/lib/StoreProvider';

function App({ Component, pageProps }: AppProps) {
  
  return <Providers>
        <Component {...pageProps} />
    </Providers>
}
export default App;

