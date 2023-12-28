"use client"
import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../Utils/useFetch';
import MovieCard from '../MovieCard/MovieCard';

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<{ title: string; poster_path: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchPopularMovies();
      setMovies(movieData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Most Popular Movies</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <MovieCard title={movie.title} posterPath={movie.poster_path} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popular;
