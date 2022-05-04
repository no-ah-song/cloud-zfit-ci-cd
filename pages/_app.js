import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/reset.css";
import "../styles/globals.css";
import "../styles/style.css";
import { RecoilRoot } from "recoil";
import React from "react";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
         <Head>
            <meta name="viewport" content="viewport-fit=cover width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"/>
        </Head>
        <Component {...pageProps} />
      </React.Suspense>
    </RecoilRoot>
  );
}

export default MyApp;
