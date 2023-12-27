"use client"
import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../Utils/useFetch';
import Image from 'next/image';

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<{ title: string; poster_path: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchPopularMovies();
      setMovies(movieData);
      console.log(movieData);
      
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Most Popular Movies</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <h3>{movie.title}</h3>
            <Image
              src= {`https://image.tmdb.org/t/p/w500/${movie.poster_path }`}
              alt={`${movie.title} Poster`}
              width={300} 
              height={400} // Set your preferred height
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popular;
