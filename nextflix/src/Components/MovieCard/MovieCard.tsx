import React from 'react';
import Image from 'next/image';
import Styles from './MovieCard.module.css'
interface MovieCardProps {
  title: string;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath }) => {
  return (
    <div className={Styles.movieCard}>
      <h3>{title}</h3>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
        alt={`${title} Poster`}
        width={300}
        height={400}
      />
    </div>
  );
};

export default MovieCard;