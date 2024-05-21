import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    
    fetch("https://movies-flixmcn-ed96d6a64be1.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath, // Assuming "ImageUrl" is the correct field for the image
            description: movie.Description,
            director: movie.Director.Name, // Extracting director's name
            bio: movie.Director.Bio, // Extracting director's bio
            birth: movie.Director.Birth, // Extracting director's birth
            death: movie.Director.Death, // Extracting director's death
            genre: movie.Genre.Name, // Extracting genre name
            genre_description: movie.Genre.Description, // Extracting genre description
            featured: movie.Featured, // Assuming "Featured" is a direct property of the movie
            releaseDate: new Date(movie.ReleaseDate), // Parsing release date
          };
        });
        console.log(data);
        setMovies(moviesFromApi);
      });
  }, [token]);

    if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            setSelectedMovie(null);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
            setSelectedMovie(null);
          }}
        >
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
            setSelectedMovie(null);
          }}
        >
          Logout
        </button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
          setSelectedMovie(null);
        }}
      >
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          onBackClick={() => setSelectedMovie(null)}
        />
      ))}
    </div>
  );
};
