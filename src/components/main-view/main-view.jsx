import React, { useState, useEffect } from "react";
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

    fetch("https://movies-flixmcn-ed96d6a64be1.herokuapp.com", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImageUrl, // Assuming "imageurl" is "ImageUrl"
            description: movie.Description,
            director: movie.Director.Name, // Extracting director's name
            bio: movie.Director.Bio, // Extracting director's bio
            birth: movie.Director.Birth, // Extracting director's birth
            death: movie.Director.Death, // Extracting director's death
            genre: movie.Genre.Name, // Extracting genre name
            genre_description: movie.Genre.Description, // Extracting genre description
            featured: movie.featured, // Assuming "featured" is a direct property of the movie
            releaseDate: new Date(movie.ReleaseDate), // Parsing release date
          };
        });
        console.log("Movies from API:", moviesFromApi); // Check the transformed movie data
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error); // Log any errors
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
          }}
        />
        <p>or</p>
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The movie list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}

      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
    </div>
  );
};
