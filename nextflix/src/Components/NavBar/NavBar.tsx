import Link from 'next/link'
import React from 'react'
import styles from './NavBar.module.css'
const navBar : React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarItems}>
      <li>Home</li>
      <li>Movies</li>
     <Link href="/About"><li>About</li></Link> 
      <li>Contact</li>
      </div>
    
    </div>
    )
}

export default navBar