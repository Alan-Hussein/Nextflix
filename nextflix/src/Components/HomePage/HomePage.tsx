import React from 'react'
import Image from 'next/image';
import styles from './HomePage.module.css'
const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Image src="/images/home10.jpg" alt="HomePage" width={5000} height={500}  layout="responsive"
/>
    </div>
  )
}

export default HomePage
