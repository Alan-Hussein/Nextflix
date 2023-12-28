import Image from 'next/image'
import styles from './page.module.css'
import HomePage from '@/Components/HomePage/HomePage'
import Popular from '../Components/Popular/Popular'
import TopRated from '@/Components/TopRated/TopRated'
export default function Home() {
  return (
   <main>
    <HomePage />
    <Popular />
    <TopRated />
    
   </main>
  )
}
