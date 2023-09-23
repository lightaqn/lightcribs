import "../styles/globals.css";
import type { AppProps } from "next/app";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import Footer from "../components/Footer";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }: AppProps) {
  const progress = new ProgressBar({
    color: "#71cfe4",
    size: 7,
    delay: 100,
    className: "z-50",
  });

  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`process.env.GOOGLE_OAUTH_CLIENT_ID`}>
      <div className="mx-auto">
        <section className="">
          <Nav />
        </section>
        <Component {...pageProps} />

        <div className="bottom-0 sticky my-10">{/* <Footer /> */}</div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
