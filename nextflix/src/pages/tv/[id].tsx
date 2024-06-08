import { useRouter } from 'next/router';
import MovieDetails from '../MovieDetails/MovieDetails'; // Adjust the path if necessary

const TvPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading</div>;
  }

  return <MovieDetails movieId={id as string} mediaType="tv" />;
};

export default TvPage;
