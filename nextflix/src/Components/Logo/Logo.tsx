import React from 'react'
import Image from 'next/image';
import styles from './Logo.module.css'
import Link from 'next/link';
const Logo = () => {
  return (
    <div>
           <Link href="/"><Image src="/images/Logo.png" alt="logo" width={100} height={75} className={styles.logo}
/>  </Link> 
                                                                         
    </div>  )
}

export default Logo