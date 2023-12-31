// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app'; // Import AppProps from Next.js

import '../styles/globals.css';
import RootLayout from '../Components/layouts/RootLayout';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
