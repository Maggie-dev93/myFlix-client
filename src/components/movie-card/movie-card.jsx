import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite }) => {
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

    if (addTitle) {
      addToFavorites();
      setAddTitle("");
    }
    if (delTitle) {
      removeFromFavorites();
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
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
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