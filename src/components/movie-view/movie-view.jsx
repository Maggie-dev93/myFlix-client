export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};