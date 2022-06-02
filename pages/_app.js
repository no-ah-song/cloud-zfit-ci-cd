import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/style.css';
import { RecoilRoot } from 'recoil';
import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<video autoPlay muted playsInline><source src="./videos/loading looping.mp4" type="video/mp4"/></video>}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scable=no,maximum-scale=1,width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </React.Suspense>
    </RecoilRoot>
  );
}

export default MyApp;
