import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; // Correct import
import "./movie-view.scss";
import Col from 'react-bootstrap/Col';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  
  console.log("Movie ID from URL:", movieId); // Log movieId
  console.log("Movies array:", movies); // Log movies array
  
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <Col><p>Movie not found</p></Col>;
  }

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
      <Link to={'/'}>
      <button 
        className="back-button"
        style={{ 
          cursor: "pointer", 
          backgroundColor: '#57636F'
        }}
        >
        Back
      </button>
      </Link>
    </div>
  );
};
