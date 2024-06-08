import { getApiUrl } from './apiConfig';
export const fetchData = async (path: string, apiKey?: string) => {
  const url = getApiUrl(path, apiKey);
  console.log('Fetching data from URL:', url);

  try {
    const headers: HeadersInit = apiKey
      ? {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      : { 'Content-Type': 'application/json' };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch data:', response.status, response.statusText);
      const errorData = await response.json();
      console.error('Error details:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Get Movies' Images
export const fetchMovieImages = async (movieId: string, apiKey?: string) => {
  const path = `/movie/${movieId}/images?`;
  const url = getApiUrl(path, apiKey);

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.backdrops.map((image: any) => ({
        src: `https://image.tmdb.org/t/p/original${image.file_path}?`,
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

// Fetch Top Rated Movies
export const fetchTopRatedMovies = async (apiKey?: string) => {
  const path = '/movie/top_rated?';
  const data = await fetchData(path, apiKey);
  return data?.results || [];
};

// Fetch Movie Details
export const fetchMovieDetails = async (movieId: string, apiKey?: string) => {
  const path = `/movie/${movieId}?`;
  return await fetchData(path, apiKey);
};

export const fetchTvDetails = async (movieId: string, apiKey?: string) => {
  const path = `/tv/${movieId}?`;
  return await fetchData(path, apiKey);
};

// Get Popular Movies
export const fetchPopularMovies = async (apiKey?: string) => {
  const path = '/movie/popular?';
  try {
    const data = await fetchData(path, apiKey);
    return data?.results || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

//GET video
export const fetchVideo = async (movieId: string,apiKey?: string) =>{
  const path = `/movie/${movieId}/videos?`;
  const data = await fetchData(path, apiKey);
  return data?.results || [];

}
//GET Similar  

export const fetchSimilar= async (movieId: string, apiKey?: string) => {
  const path = `/movie/${movieId}/similar?`;
  const data = await fetchData(path, apiKey);
  console.log(data);
  
  return data?.results || [];
};


// Assume SearchResult interface and fetchData function are defined elsewhere
export interface SearchResult {
  id: number;
  title: string;
  imageUrl: string; // Add imageUrl property
  mediaType: 'movie' | 'tv';
}

export const Search = async (searchQuery: string, apiKey?: string): Promise<SearchResult[]> => {
  try {
    const path = `/search/multi?query=${searchQuery}&`;
    const data = await fetchData(path, apiKey);
    const searchResults: SearchResult[] = data.results.map((result: any) => ({
      id: result.id,
      title: result.name || result.title,
      imageUrl: result.poster_path
        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
        : 'https://via.placeholder.com/150', // Placeholder image URL if poster_path is null
      mediaType: result.media_type, // Corrected spelling to mediaType
    }));
    return searchResults;
  } catch (error) {
    console.error('Error searching:', error);
    return []; // Return an empty array in case of error
  }
};

