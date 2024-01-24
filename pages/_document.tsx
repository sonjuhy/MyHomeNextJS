import { Html, Head, Main, NextScript } from 'next/document'

import { StoreProvider } from '../StoreProvider'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <StoreProvider>
          <Main />
          <NextScript />
        </StoreProvider>
      </body>
    </Html>
  )
}
