import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  fetchMovieDetails,
  fetchTvDetails,
  fetchMovieImages,
  fetchVideo,
} from "../../Utils/useFetch";
import Image from "next/image";
import styles from "./MovieDetails.module.css";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import Similar from "../../Components/Similar/Similar";
import NavBar from "@/Components/NavBar/NavBar";

interface MovieDetailsProps {
  movieId: string;
  mediaType: 'movie' | 'tv';
  apiKey?: string;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId, mediaType, apiKey }) => {
  const [details, setDetails] = useState<any>(null);
  const [images, setImages] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      const details = mediaType === 'tv' 
        ? await fetchTvDetails(movieId, apiKey) 
        : await fetchMovieDetails(movieId, apiKey);
      setDetails(details);
    };

    const fetchImages = async () => {
      const images = await fetchMovieImages(movieId, apiKey);
      setImages(images ? shuffleArray(images).slice(0, 6) : null);
    };

    const fetchVideoDetails = async () => {
      const videos = await fetchVideo(movieId, apiKey);
      if (videos && videos.length > 0) {
        setVideo(videos[0]);
      } else {
        setVideo(null);
      }
    };

    fetchVideoDetails();
    fetchDetails();
    fetchImages();
  }, [movieId, mediaType, apiKey]);

  if (!details || !images) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailsPage}>
      <NavBar />
      <div className={styles.movieDetails}>
        <div className={styles.back}>
          <FaArrowLeft className={styles.backIcon} onClick={() => router.back()} />
          <h2 className={styles.movieTitle}>{details.title || details.name}</h2>
        </div>
        <div className={styles.overview}>
          <Image
            className={styles.movieImg}
            src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
            alt={`${details.title || details.name} Poster`}
            width={500}
            height={500}
          />
          <div className={styles.movieDetailsOverview}>
            <p className={styles.originalTitle}>
              {details.original_title || details.original_name}
            </p>
            <p className={styles.movieOverview}>{details.overview}</p>
            {details.genres.map((genre: any) => (
              <p className={styles.genres} key={genre.id}>
                {genre.name} |
              </p>
            ))}
            <div className={styles.voteStar}>
              <p className={styles.vote}>
                {details.vote_average.toFixed(1)}
              </p>
              <FaStar className={styles.star} />
            </div>
            <div className={styles.languages}>
              <span>Spoken Languages:</span>{" "}
              {details.spoken_languages.map((lan: any, index: number) => (
                <h4 key={index}>{lan.english_name}/ </h4>
              ))}
            </div>
            {details.homepage && (
              <a className={styles.watch} href={details.homepage}>
                {" "}
                Link To Watch
              </a>
            )}
          </div>
        </div>
        <div className={styles.video}>
          {video && (
            <div className={styles.videoContainer}>
              <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                width={900}
                height={450}
                allowFullScreen
              />
            </div>
          )}
          <div className={styles.movieImages}>
            {images.map((image: any, index: number) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={300}
                height={200}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Similar movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieDetails;
