import React, { useState, useEffect } from 'react';
import { Col, Dropdown, Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './searchbar-view.scss'; // Import the SCSS file


export const SearchBar = ({ token }) => {
  const [searchInput, setSearchInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetch("https://movies-flixmcn-ed96d6a64be1.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          description: movie.Description,
          director: movie.Director.Name,
          bio: movie.Director.Bio,
          birth: movie.Director.Birth,
          death: movie.Director.Death,
          genre: movie.Genre.Name,
          genre_description: movie.Genre.Description,
          featured: movie.Featured,
          releaseDate: new Date(movie.ReleaseDate),
        }));
        console.log(data);
        setMovies(moviesFromApi);
        setFilteredMovies(moviesFromApi);
      });
  }, [token]);

  const genres = ['Fantasy', 'Romance', 'Musical', 'Action'];

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    filterMovies(input, selectedGenres);
  };

  const handleGenreChange = (genre) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(newSelectedGenres);
    filterMovies(searchInput, newSelectedGenres);
  };

  const filterMovies = (input, genres) => {
    const lowercasedInput = input.toLowerCase();
    const filtered = movies.filter((movie) => {
      const matchesSearchInput = movie.title.toLowerCase().includes(lowercasedInput);
      const matchesGenre = genres.length === 0 || genres.includes(movie.genre);
      return matchesSearchInput && matchesGenre;
    });
    setFilteredMovies(filtered);
  };

  return (
    <div className="mb-4 mt-4" style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
      <Form>
        <Form.Control
          type="text"
          placeholder="Search a movie title here"
          onChange={handleChange}
          value={searchInput}
        />
      </Form>
      <br />
      <br />

      <p> or Search by Genre:</p>

      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-genres">
          Select Genres
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {genres.map((genre) => (
            <Dropdown.Item key={genre}>
              <Form.Check
                type="checkbox"
                label={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
                className="custom-checkbox"
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className="d-flex flex-wrap">
        {filteredMovies.length > 0 &&
          filteredMovies.map((movie) => (
            <Col className="mb-4 mt-4" key={movie.id} md={3}>
              <MovieCard movie={movie} updateAction={() => {}} />
            </Col>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
