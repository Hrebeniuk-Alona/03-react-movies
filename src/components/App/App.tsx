import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar'
import './App.module.css'
import {fetchMovies} from '../../services/movieService'
import { type Movie } from '../../types/movie'
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';






export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const openModal = (movie: Movie) => { setSelectedMovie(movie) };
  const closeModal = () => { setSelectedMovie(null)};
  
  const notify = () => toast('No movies found for your request.');

  const handleSearch = async (newQuery: string) => {
    
    try {
      setIsLoading(true)
      setIsError(false)
      setMovies([])

     const newMovie = await fetchMovies(newQuery);

     if (newMovie.length === 0) {
       notify()
       return
     }

      setMovies(newMovie)
  }

  catch {
      setIsError(true) 
      setMovies([])
  }
    finally {
      setIsLoading(false)
     }
 
  }
  


  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />

      {isLoading && <Loader />}
      {isError && <ErrorMessage/>}
     
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {selectedMovie!==null && (<MovieModal movie={selectedMovie} onClose={closeModal}/>)}
      
     
    </div>
  )
  
}


