// pages/movie/[id].tsx
import { useRouter } from 'next/router';
import MovieDetails from '../MovieDetails/MovieDetails';

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading</div>;
  }

  return <MovieDetails movieId={id as string} />;
};

export default MoviePage;
