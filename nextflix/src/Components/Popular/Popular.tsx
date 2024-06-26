"use client"
import React, { useEffect, useState, useRef } from 'react';
import { fetchPopularMovies } from '../../Utils/useFetch';
import MovieCard from '../MovieCard/MovieCard';
import styles from '../MovieCard/MovieCard.module.css';
import useScroll from '../../Utils/useScroll'; 
import  Styles  from './Popular.module.css';
const Popular: React.FC = () => {
  const [movies, setMovies] = useState<{ title: string; poster_path: string ;id: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleTouchStart, handleTouchMove, handleTouchEnd,handleButtonClick ,handleWheel} = useScroll({ containerRef });

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchPopularMovies();
      setMovies(movieData);
    };

    fetchData();
  }, []);

  return (
    <div id='popular'>
<h1 className={`${styles['title']} ${Styles['titlePopular']}`}>Popular Movies</h1>
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
            <MovieCard key={index} title={movie.title} posterPath={movie.poster_path}  movieId={movie.id}/>
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

export default Popular;



