import { useRouter } from 'next/router';
import MovieDetails from '../MovieDetails/MovieDetails'; // Adjust the path if necessary

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading</div>;
  }

  return <MovieDetails movieId={id as string} mediaType="movie" />;
};

export default MoviePage;
