import axios from 'axios'
import { type Movie } from '../types/movie'

interface MovieHttpResponse{
 results: Movie[];
}



export const fetchMovies = async (newQuery: string):Promise<Movie[]> => {
  const response = await axios.get<MovieHttpResponse>('https://api.themoviedb.org/3/search/movie',{
    params: {
      query: newQuery,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,} 
  }
  );

  return response.data.results;
}