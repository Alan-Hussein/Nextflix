const defaultApiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY || '';

export const getApiUrl = (path: string, apiKey?: string) => {
  const finalApiKey = apiKey || defaultApiKey;
  const baseApiUrl = 'https://api.themoviedb.org/3';
  const fullUrl = `${baseApiUrl}${path}?api_key=${finalApiKey}`;
  return fullUrl;
};
