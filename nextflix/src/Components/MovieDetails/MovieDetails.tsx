// MovieDetails.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchMovieDetails, fetchMovieImages } from "../../Utils/useFetch";
import Image from "next/image";
import styles from "./MovieDetails.module.css";
import { FaStar } from "react-icons/fa";

interface MovieDetailsProps {
  movieId: string;
  apiKey?: string;
}
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId, apiKey }) => {
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [movieImages, setMovieImages] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchMovieDetails(movieId, apiKey);
      setMovieDetails(details);
    };

    const fetchImages = async () => {
      const images = await fetchMovieImages(movieId, apiKey);
      setMovieImages(images ? shuffleArray(images).slice(0, 6) : null);
    };

    fetchDetails();
    fetchImages();
  }, [movieId, apiKey]);

  if (!movieDetails || !movieImages) {
    return <div>Loading...</div>;
  }
  console.log(movieDetails.poster_path);

  return (
    <div>
      <div className={styles.movieDetails}>
        <h2 className={styles.movieTitle}>{movieDetails.title}</h2>
        <div className={styles.overview}>
          <Image
            className={styles.movieImg}
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={`${movieDetails.title} Poster`}
            width={500}
            height={500}
          />
          <div className={styles.movieDetailsOverview}>
            <p className={styles.originalTitle}>
              {movieDetails.original_title}
            </p>
            <p className={styles.movieOverview}>{movieDetails.overview}</p>

            {movieDetails.genres.map((genre: any) => (
              <p className={styles.genres} key={genre.id}>
                {genre.name} |
              </p>
            ))}
            <div className={styles.voteStar}>
              <p className={styles.vote}>
                {movieDetails.vote_average.toFixed(1)}
              </p>
              <FaStar className={styles.star} />
            </div>

            <div className={styles.languages}>
              <span>Sopken Languages:</span>{" "}
              {movieDetails.spoken_languages.map((lan: any) => (
                <h4>{lan.english_name}/ </h4>
              ))}
            </div>
            {movieDetails.homepage && (
              <a className={styles.watch} href={movieDetails.homepage}>
                {" "}
                Link To Watch
              </a>
            )}
          </div>
        </div>
      </div>
      {/* <div>
         {movieImages.map((image: any, index: number) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          width={300}
          height={200}
        />
      ))}
      </div> */}
    </div>
  );
};

export default MovieDetails;
