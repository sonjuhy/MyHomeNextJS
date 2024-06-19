import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.css'
import {Providers} from '@/lib/redux/StoreProvider';

import TransLayout from '@/lib/transitionAnimation/transLayout';

function App({ Component, pageProps }: AppProps) {
  
  return <Providers>
        <TransLayout>
          <Component {...pageProps} />
        </TransLayout>
    </Providers>
}
export default App;

