// pages/movie/[id].tsx
import { useRouter } from 'next/router';
import MovieDetails from '../../Components/MovieDetails/MovieDetails';

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading</div>;
  }

  return <MovieDetails movieId={id as string} apiKey='64cc36fb018acbb8f7f350a37b672014'/>;
};

export default MoviePage;
