import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/reset.css";
import "../styles/globals.css";
import "../styles/style.css";
import { RecoilRoot } from "recoil";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component {...pageProps} />
      </React.Suspense>
    </RecoilRoot>
  );
}

export default MyApp;
