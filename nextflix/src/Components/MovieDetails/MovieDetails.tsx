// MovieDetails.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMovieDetails } from '../../Utils/useFetch'; // Update import path

interface MovieDetailsProps {
  movieId: string;
  apiKey?: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId, apiKey }) => {
  const [movieDetails, setMovieDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchMovieDetails(movieId, apiKey);
      setMovieDetails(details);
    };

    fetchDetails();
  }, [movieId, apiKey]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.overview}</p>
    </div>
  );
};

export default MovieDetails;
