import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Styles from './MovieCard.module.css';

interface MovieCardProps {
  title: string;
  posterPath: string;
  movieId: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterPath, movieId }) => {
  return (
    <Link href={`/movie/${movieId}`} passHref>
      <div className={Styles.movieCard}>
        <h3>{title}</h3>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          alt={`${title} Poster`}
          width={300}
          height={400}
        />
      </div>
    </Link>
  );
};

export default MovieCard;
