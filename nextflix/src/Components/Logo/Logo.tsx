import React from 'react'
import Image from 'next/image';
import styles from './Logo.module.css'
const Logo = () => {
  return (
    <div>
      <Image src="/images/Logo.png" alt="logo" width={100} height={75} className={styles.logo}
/>                                                                          
    </div>  )
}

export default Logo