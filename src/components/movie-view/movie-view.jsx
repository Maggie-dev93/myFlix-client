import PropTypes from "prop-types"; // Import PropTypes
import "./movie-view.scss";
import Col from 'react-bootstrap/Col';


export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div style={{ backgroundColor: '#5B85AA' }}>
       <div>
        {movie.image ? (
          <img src={movie.image} alt={movie.title} style={{ width: '100%' }} />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre_description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.bio}</span>
      </div>
      <div>
        <span>Director Birth Date: </span>
        <span>{movie.birth}</span>
      </div>
      <div>
        <span>Director Death: </span>
        <span>{movie.death}</span>
      </div>
      <button 
        onClick={onBackClick} 
        className="back-button"
        style={{ 
          cursor: "pointer", 
          backgroundColor: '#57636F'
        }}
        >
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
};

