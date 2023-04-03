import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

import { SessionProvider as AuthProvider, session } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider session={session}>
        <Component {...pageProps} />
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default MyApp;
