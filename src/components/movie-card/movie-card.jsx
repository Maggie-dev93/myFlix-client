import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100"  style={{ cursor: 'pointer' }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body style={{ backgroundColor: '#5B85AA' }}>
        <Card.Title className="text-center">{movie.title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button style={{ backgroundColor: '#57636F' }} variant="link">
            Open
          </Button>
        </Link>
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