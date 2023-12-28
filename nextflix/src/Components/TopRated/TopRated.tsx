"use client"
import React, { useEffect, useState, useRef } from 'react';
import { fetchTopRatedMovies } from '../../Utils/useFetch'; // Update the import statement
import MovieCard from '../MovieCard/MovieCard';
import styles from '../MovieCard/MovieCard.module.css';

const TopRated: React.FC = () => {
  const [movies, setMovies] = useState<{ title: string; poster_path: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchTopRatedMovies();
      setMovies(movieData);
    };

    fetchData();
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const deltaX = touchStartX.current - e.touches[0].clientX;
    touchStartX.current = e.touches[0].clientX;

    if (containerRef.current) {
      containerRef.current.scrollLeft += deltaX;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  const handleButtonClick = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    const cardWidth = 340; // Adjust the card width based on styles
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    if (container) {
      container.scrollLeft += scrollAmount;
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the default behavior

    const container = containerRef.current;
    const cardWidth = 340; // Adjust the card width based on styles

    if (container) {
      if (e.deltaY > 0) {
        container.scrollLeft += cardWidth; // Scroll right
      } else {
        container.scrollLeft -= cardWidth; // Scroll left
      }
    }

    // Stop the propagation of the wheel event to prevent it from affecting parent elements
    e.stopPropagation();
  };

  
  return (
    <div>
      <h1 className={styles['title']}> Top Rated</h1>
      <div className={styles['movie-card-container-wrapper']}>
        <div
          id="movie-card-container"
          className={styles['movie-card-container']}
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          {movies.map((movie, index) => (
            <MovieCard key={index} title={movie.title} posterPath={movie.poster_path} />
          ))}
        </div>
        <div className={styles['navigation-buttons-left']}>
          <button onClick={() => handleButtonClick('left')}>{'<'}</button>
        </div>
        <div className={styles['navigation-buttons-right']}>
          <button onClick={() => handleButtonClick('right')}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default TopRated;



