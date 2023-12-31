// pages/index.tsx
import React from 'react';
import HomePage from '../Components/HomePage/HomePage';
import Popular from '../Components/Popular/Popular';
import TopRated from '../Components/TopRated/TopRated';
import RootLayout from '../Components/layouts/RootLayout';
import NavBar from '@/Components/NavBar/NavBar';
export default function Home() {
  return (
    <main>
       <NavBar />
      <HomePage />
      <Popular />
      <TopRated />
    </main>
     
  );
}
