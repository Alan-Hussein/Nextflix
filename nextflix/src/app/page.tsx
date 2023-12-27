import Image from 'next/image'
import styles from './page.module.css'
import HomePage from '@/Components/HomePage/HomePage'
import Popular from '../Components/Popular/Popular'
export default function Home() {
  return (
   <main>
    <HomePage />
    <h1 className='main'>Hello World!</h1>
    <div>
      <Popular />
    </div>
    
   </main>
  )
}
