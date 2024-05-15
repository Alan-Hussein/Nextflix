import React, { useState } from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';
import Logo from '../Logo/Logo';
import SearchInput from '../Search/SearchInput';
import { Search, SearchResult } from '../../Utils/useFetch'; // Make sure SearchResult type is imported

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = async (searchQuery: string): Promise<SearchResult[]> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; // Replace 'your_api_key' with your actual API key
      return await Search(searchQuery, apiKey);
    } catch (error) {
      console.error('Error searching:', error);
      return []; // Return an empty array or handle error case appropriately
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}><Logo  /></div>
      <div className={`${styles.navbarItems} ${isMenuOpen ? styles.open : ''}`}>
        <Link href="/"><li>Home</li></Link>
        <li>Movies</li>
        <Link href="/About"><li>About</li></Link>
        <li>Contact</li>
        <div className={styles.logoMobile}><Logo  /></div>

      </div>
      <div className={styles.searchWrapper}>
        <SearchInput onSearch={handleSearch} />
      </div>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </div>
  );
};

export default NavBar;
