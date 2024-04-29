export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.poster} alt={movie.title} />
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
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Director Birth Date: </span>
        <span>{movie.director.birth}</span>
      </div>
      <div>
        <span>Director Death: </span>
        <span>{movie.director.death}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
