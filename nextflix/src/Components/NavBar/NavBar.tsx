import React from 'react';
import Link from 'next/link';
import styles from './NavBar.module.css';
import Logo from '../Logo/Logo';
import SearchInput from '../Search/SearchInput';
import { Search, SearchResult } from '../../Utils/useFetch'; // Make sure SearchResult type is imported

const NavBar: React.FC = () => {
  const handleSearch = async (searchQuery: string): Promise<SearchResult[]> => { // Ensure handleSearch returns Promise<SearchResult[]>
    try {
      const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY; // Replace 'your_api_key' with your actual API key
      return await Search(searchQuery, apiKey);
    } catch (error) {
      console.error('Error searching:', error);
      return []; // Return an empty array or handle error case appropriately
    }
  };

  return (
    <div className={styles.navbar}>
      <Logo />

      <div className={styles.navbarItems}>
        <Link href="/"><li>Home</li></Link>
        <li>Movies</li>
        <Link href="/About"><li>About</li></Link>
        <li>Contact</li>
      </div>

      <SearchInput onSearch={handleSearch} />
    </div>
  );
};

export default NavBar;
