import React from 'react'
import NavBar from '@/Components/NavBar/NavBar'
import styles from "./About.module.css"
const aboutPage = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.aboutPage}>
        <p className={styles.title}>About US</p>
        <p>Welcome to <span className={styles.Nextflix} >Nextflix</span> your ultimate destination for all things film! Whether you're a cinephile,
           a casual movie-goer, or someone who just loves a good story,
            we have something special for you. Our passion for movies drives us to bring you the latest in film news, reviews, trailers, and more.</p>
      </div>
    </div>
  )
}

export default aboutPage
