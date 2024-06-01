import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite, onRemoveFromFavorites }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");

  useEffect(() => {
    const addToFavorites = () => {
      fetch(
        `https://movies-flixmcn-ed96d6a64be1.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add movie to favorites.");
          }
          return response.json();
        })
        .then((user) => {
          alert("Movie added to favorites successfully!");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleRemoveFromFavorites = () => {
      fetch(`https://movies-flixmcn-ed96d6a64be1.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, 
      {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.ok) {
          alert('Your movie has been removed');
          window.location.reload();
        } else {
          alert('Error removing movie');
        }
      })
      .catch((error) => {
        console.error('Error removing movie:', error);
        alert('Error removing movie');
      });
  };

    if (addTitle) {
      addToFavorites();
      setAddTitle("");
    }
    if (delTitle) {
      handleRemoveFromFavorites(); // Call the function to remove the movie from favorites
      setDelTitle("");
    }
  }, [addTitle, delTitle, token, user]);

  const handleAddToFavorites = () => {
    setAddTitle(movie.title);
  };

  const handleRemoveFromFavorites = () => {
    setDelTitle(movie.title);
  };

  return (
    <Card className="h-100" style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body style={{ backgroundColor: "#5B85AA" }}>
        <Card.Title className="text-center">{movie.title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button
            style={{ backgroundColor: "#57636F", color: "white" }}
            variant="link"
          >
            Open
          </Button>
        </Link>
        <Button
          variant="primary"
          onClick={handleAddToFavorites}
          disabled={!token}
        >
          Favorite Movie
        </Button>
        <Button
          variant="danger"
          onClick={handleRemoveFromFavorites} // Call the function to remove the movie from favorites
          disabled={!token}
        >
          Remove from Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired, // Expect a string value for the movie ID
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    bio: PropTypes.string,
    birth: PropTypes.string,
    death: PropTypes.string,
    genre: PropTypes.string.isRequired,
    genre_description: PropTypes.string,
    releaseDate: PropTypes.instanceOf(Date),
  }).isRequired,
};
