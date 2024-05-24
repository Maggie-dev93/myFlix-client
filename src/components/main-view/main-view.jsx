import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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

  return (
    <Row className="justify-content-md-center"> 
      {!user ? (
        <Col style={{ backgroundColor: '#5B85AA' }} md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
          </Col>
      ) : (
        <>
          <button
          variant="primary" 
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
              setSelectedMovie(null);
            }}
          >
            Logout
          </button>
          {selectedMovie ? (
            <Col md={8} style={{ border: "1px solid black" }}>
            <MovieView
              style={{ border: "1px solid green" }}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
          ) : movies.length === 0 ? (
            <div>The list is empty!</div>
          ) : (
            <>
              {movies.map((movie) => (
                <Col className="mb-5"key={movie.id} md={3}>
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
                </Col>
              ))}
            </>
          )}
        </>
      )}
    </Row>
  );
  
};
