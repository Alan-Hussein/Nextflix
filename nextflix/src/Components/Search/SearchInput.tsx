import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import styles from './SearchInput.module.css';
import { SearchResult } from '../../Utils/useFetch'; // Adjust the path as needed

interface SearchInputProps {
  onSearch: (searchQuery: string) => Promise<SearchResult[]>;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') { // Ensure query is not empty before searching
      try {
        const results = await onSearch(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching:', error);
        setSearchResults([]); // Clear search results on error
      }
    } else {
      setSearchResults([]); // Clear search results if query is empty
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleChange}
        className={styles.searchInput}
      />
      {searchResults.length > 0 && (
        <div className={styles.searchResults}>
          <div className={styles.resultsContainer}>
            <ul className={styles.resultsList}>
              {searchResults.map(result => (
                <li key={result.id} className={styles.result}>
                  <Link href={`/movie/${result.id}`}>
                    <div>
                      <img src={result.imageUrl} alt={result.title} className={styles.resultImage} />
                      <span className={styles.resultTitle}>{result.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {searchResults.length === 0 && searchQuery.trim() !== '' && (
        <div className={styles.noResults}>No results found</div>
      )}
    </div>
  );
};

export default SearchInput;
