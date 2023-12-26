import Link from 'next/link'
import React from 'react'
import styles from './NavBar.module.css'
import Logo from '../Logo/Logo'
const navBar : React.FC = () => {
  return (
    <div className={styles.navbar}>     
     <Logo />

      <div className={styles.navbarItems}>
      <Link href="/"><li>Home</li></Link> 
      <li>Movies</li>
     <Link href="/About"><li>About</li></Link> 
      <li>Contact</li>
      </div>
    
    </div>
    )
}

export default navBar