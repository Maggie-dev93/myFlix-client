import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: { $oid: "661f4ac250e1add6e3ef635a" },
      title: "Harry Potter and the Sorcerer's Stone",
      description:
        "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
      releaseDate: "2001",
      director: {
        name: "Chris Columbus",
        bio: "Chris Columbus is an American filmmaker and producer, known for directing family and fantasy films.",
        birth: "1958",
        death: "Still Living",
      },
      genre: {
        name: "Fantasy",
        description:
          "Fantasy film is a genre that incorporates magical, mythical, or supernatural elements as a core part of the plot, theme, or setting. Many fantasy films are inspired by folklore and mythology, creating unique worlds where magic frequently plays a key role.",
      },
      poster:
        "https://image.tmdb.org/t/p/original/kZModq4nvmXhSmXdMJWSmbqWXhH.jpg",
    },
    {
      _id: { $oid: "661f4ac250e1add6e3ef635b" },
      title: "Harry Potter and the Chamber of Secrets",
      description:
        "An ancient prophecy seems to be coming true when a mysterious presence begins stalking the corridors of a school of magic and leaving its victims paralyzed.",
      releaseDate: "2002",
      director: {
        name: "Chris Columbus",
        bio: "Chris Columbus is an American filmmaker and producer, known for directing family and fantasy films.",
        birth: "1958",
        death: "Still Living",
      },
      genre: {
        name: "Fantasy",
        description:
          "Fantasy film is a genre that incorporates magical, mythical, or supernatural elements as a core part of the plot, theme, or setting. Many fantasy films are inspired by folklore and mythology, creating unique worlds where magic frequently plays a key role.",
      },
      poster:
        "https://rukminim2.flixcart.com/image/850/1000/jmkwya80/poster/z/6/z/large-wb-official-licensed-harry-potter-chamber-of-secrets-movie-original-imaf9gh7kf8688ga.jpeg?q=20&crop=false",
    },
    {
      _id: { $oid: "661f4ac250e1add6e3ef635c" },
      title: "Harry Potter and the Prisoner of Azkaban",
      description:
        "Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.",
      releaseDate: "2004",
      director: {
        name: "David Yates",
        bio: "David Yates is a British film director best known for directing the final four films in the Harry Potter film series.",
        birth: "1963",
        death: "Still Living",
      },
      genre: {
        name: "Fantasy",
        description:
          "Fantasy film is a genre that incorporates magical, mythical, or supernatural elements as a core part of the plot, theme, or setting. Many fantasy films are inspired by folklore and mythology, creating unique worlds where magic frequently plays a key role.",
      },
      poster:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_yF4_zlBYcrgG0Wuteh2OXP1czONAiGhc8vjFBj4UA&s",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id.$oid}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
