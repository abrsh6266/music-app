import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { MusicPlayerContainer } from "../components/Container";

// Styled components
const GenresContainer = styled(MusicPlayerContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
  margin-top: 1em;
`;

const GenreItem = styled(Link)`
  padding: 1em 2em;
  background-color: ${({ theme }:any) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }:any) => theme.radii.medium};
  text-decoration: none;
  font-size: 1.2em;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }:any) => theme.colors.secondary};
  }
`;

// List of available genres
const genres = [
  "Rock",
  "Pop",
  "Hip Hop",
  "Jazz",
  "Classical",
  "Country",
  "Electronic",
  "Reggae",
  "Blues",
  "Metal",
  "Folk",
  "Punk",
  "Soul",
];

const GenresPage: React.FC = () => {
  return (
    <GenresContainer>
      <h2>Genres</h2>
      <GenreList>
        {genres.map((genre) => (
          <GenreItem key={genre} to={`/genres/${genre.toLowerCase()}`}>
            {genre}
          </GenreItem>
        ))}
      </GenreList>
    </GenresContainer>
  );
};

export default GenresPage;
