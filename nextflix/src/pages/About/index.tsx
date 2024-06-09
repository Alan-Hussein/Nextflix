import React from "react";
import NavBar from "@/Components/NavBar/NavBar";
import styles from "./About.module.css";
const aboutPage = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.aboutPage}>
        <p className={styles.title}>About US</p>
        <p>
          Welcome to <span className={styles.Nextflix}>Nextflix</span> your
          ultimate destination for all things film! Whether you're a cinephile,
          a casual movie-goer, or someone who just loves a good story, we have
          something special for you. Our passion for movies drives us to bring
          you the latest in film news, reviews, trailers, and more.
        </p>
        <p className={styles.red}>- Our Vision : </p>
        <p>
          At Nextflix, we believe in the magic of movies. Our mission is to make
          it easy for you to discover, explore, and enjoy films from all over
          the world. We aim to be your trusted companion in the cinematic
          journey, providing all the information you need in one place.
        </p>
        <p className={styles.red}>What We Offer : </p>
        <p className={styles.point}><span className={styles.bold}>Extensive Film Library:</span> Explore our comprehensive library of films spanning all genres, eras, and languages.
           From timeless classics to the latest releases, our collection is constantly updated to ensure you have access to the best of cinema.</p>
           <p className={styles.point}><span className={styles.bold}>Where to Watch:</span> Find out where you can watch the films you love.
             We provide information on streaming services, rental options, and purchase links so you can easily access the movies you want to see.</p>
             
             <p className={styles.red}>Join Us</p>
             <p>We invite you to become a part of our community.
               Follow us on social media, subscribe to our newsletter, and engage with fellow movie lovers on our site.
                At <span className={styles.Nextflix}>Nextflix</span>, every visit is an opportunity to discover something new and exciting in the world of film.

Thank you for choosing <span className={styles.Nextflix}>Nextflix</span>. Let’s explore the magic of movies together!</p>
      </div>
    </div>
  );
};

export default aboutPage;
