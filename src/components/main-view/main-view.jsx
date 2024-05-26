import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar"; // Import NavigationBar
import { ProfileView } from "../profile-view/profile-view";
import { UpdateUser } from '../profile-view/update-user';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


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

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleUserUpdated = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <BrowserRouter>
          <NavigationBar user={user} onLoggedOut={handleLogout} /> {/* Add NavigationBar */}
      <Row className="justify-content-md-center mt-4">
        <Routes>
          <Route 
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/users" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/users" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView user={user} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile/update"
            element={
              <>
                {!user ? (
                  <Navigate to="/users" replace />
                ) : (
                  <Col md={8}>
                    <UpdateUser user={user} onUserUpdated={handleUserUpdated} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/users" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};