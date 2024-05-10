import React, { useEffect, useState, useRef } from 'react';
import { fetchSimilarVideos } from '../../Utils/useFetch';
import MovieCard from '../MovieCard/MovieCard';
import styles from '../MovieCard/MovieCard.module.css';
import useScroll from '../../Utils/useScroll'; 

interface SimilarProps {
  movieId: string; // Assuming movieId is passed as a prop
}

const Similar: React.FC<SimilarProps> = ({ movieId }) => {
  const [movies, setMovies] = useState<{ title: string; poster_path: string; id: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleTouchStart, handleTouchMove, handleTouchEnd, handleButtonClick, handleWheel } = useScroll({ containerRef });

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchSimilarVideos(movieId);
      setMovies(movieData);
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      <h1 className={styles['title']}> Similar Movies</h1>
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
          {movies && movies.map((movie, index) => (
            <MovieCard key={index} title={movie.title} posterPath={movie.poster_path} movieId={movie.id} />
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

export default Similar;
