import React from 'react';
import Image from 'next/image';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.triangle}></div>
      <div className={styles.overlay}>
        <div className={styles.logo}>
          <h1>Nextflix</h1>
        </div>
        <div className={styles.content}>
          <h2>SEE WHAT’S <span className={styles.next}>NEXT.</span></h2>
          <p>Watch anywhere. Cancel anytime.</p>
          <button className={styles.joinButton}>Join free for a month</button>
          <button className={styles.signInButton}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
