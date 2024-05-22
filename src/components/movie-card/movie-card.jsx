// Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer' }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body style={{ backgroundColor: '#5B85AA' }}>
        <Card.Title className="text-center">{movie.title}</Card.Title>
        <Button style={{ backgroundColor: '#E7E7E7' }} onClick={() => onMovieClick(movie)} variant="link">
          Open
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
  onMovieClick: PropTypes.func.isRequired,};




/*<div
onClick={() => {
  onMovieClick(movie);
}}
>
<img src={movie.image} alt={movie.title} />
<div>
<span>{movie.title}</span>
</div>
</div>
);
};*/