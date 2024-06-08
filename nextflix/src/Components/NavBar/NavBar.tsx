import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter from next/router
import styles from "./NavBar.module.css";
import Logo from "../Logo/Logo";
import SearchInput from "../Search/SearchInput";
import { Search, SearchResult } from "../../Utils/useFetch";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleSearch = async (searchQuery: string): Promise<SearchResult[]> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;
      return await Search(searchQuery, apiKey);
    } catch (error) {
      console.error("Error searching:", error);
      return [];
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={`${styles.navbarItems} ${isMenuOpen ? styles.open : ""}`}>
        <Link href="/" passHref>
          <li className={router.pathname === "/" ? styles.active : ""}>Home</li>
        </Link>
        <Link href="/About" passHref>
          <li className={router.pathname === "/About" ? styles.active : ""}>About</li>
        </Link>
        <div className={styles.logoMobile}>
          <Logo />
        </div>
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
