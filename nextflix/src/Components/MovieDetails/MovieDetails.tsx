// MovieDetails.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMovieDetails, fetchMovieImages } from '../../Utils/useFetch';
import Image from 'next/image';

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
      <h2>{movieDetails.title}</h2>
          {movieDetails.title !== movieDetails.original_title ? (<p>{movieDetails.original_title}</p>) : null}
          <p>{movieDetails.overview}</p>
      <Image
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={`${movieDetails.title} Poster`}
          width={500}
          height={400}

        />
        <p>{movieDetails.vote_average.toFixed(1)}</p>
        {movieImages.map((image: any, index: number) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          width={300}
          height={200}
        />
      ))}
      <h3>original language : {movieDetails.original_language}</h3>
      {<h3><a href={movieDetails.homepage}> Link To Watch</a></h3>}
      {movieDetails.genres.map((genre:any) => (
  <h4 key={genre.id}>{genre.name} </h4>
))}
<div><span>Sopken Languages:</span> {movieDetails.spoken_languages.map((lan:any)=>(<h4>{lan.english_name}</h4>))}</div>

    </div>
  );
};

export default MovieDetails;
