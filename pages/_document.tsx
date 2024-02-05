import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="images/icons/icon-192x192.png"></link>
        <meta name="msapplication-TileColor" content="#212529"></meta>
        <meta name="theme-color" content='#212529'/>
        <link
            href="images/favicons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
        />
        <link
            href="images/favicons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
        />
      </Head>
      <body>
          <Main />
          <NextScript />
      </body>
    </Html>
  )
}
