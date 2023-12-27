import { getApiUrl } from './apiConfig';

export const fetchData = async (path: string, apiKey?: string) => {
  const url = getApiUrl(path, apiKey);

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch data');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

//Get Popular Movies 
export const fetchPopularMovies = async (apiKey?: string) => {
  const path = '/movie/popular';
  const data = await fetchData(path, apiKey);
  return data?.results || [];
};


//Get Movies's Images

export const fetchMovieImages = async (movieId: number, apiKey?: string) => {
    const path = `/movie/${movieId}/images`;
    const url = getApiUrl(path, apiKey);
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data.backdrops.map((image: any) => ({
          src: `https://image.tmdb.org/t/p/original${image.file_path}`,
          alt: `Backdrop Image for Movie ${movieId}`,
        }));
      } else {
        console.error('Failed to fetch movie images');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };