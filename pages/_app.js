import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/style.css';
import { RecoilRoot } from 'recoil';
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Loading><video autoPlay muted playsInline loop><source src="./videos/loading looping.mp4" type="video/mp4"/></video></Loading>}>
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
const Loading = styled.div`
width:100vw;
height:100vh;
display:flex;

video{
// transform: scale(3);
// object-fit: contain;
// width: 100%;
object-fit: cover;
height: 100%;
width: 100%;
}
`
export default MyApp;
