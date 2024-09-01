import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateMusicRequest } from "../features/music/musicSlice";
import { RootState } from "../store";
import { MusicPlayerContainer } from "../components/Container";
import styled from "@emotion/styled";
import { FaSpinner } from "react-icons/fa";
import { Music } from "../utils";

// Styled components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 2em auto;
  padding: 2em;
  background-color: ${({ theme }: any) => theme.colors.background};
  border-radius: ${({ theme }: any) => theme.radii.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75em 1em;
  margin: 0.5em 0;
  border: 1px solid ${({ theme }: any) => theme.colors.lightGray};
  border-radius: ${({ theme }: any) => theme.radii.small};
  font-size: 1em;
  outline: none;

  &:focus {
    border-color: ${({ theme }: any) => theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75em 1em;
  margin: 0.5em 0;
  border: 1px solid ${({ theme }: any) => theme.colors.lightGray};
  border-radius: ${({ theme }: any) => theme.radii.small};
  font-size: 1em;
  outline: none;

  &:focus {
    border-color: ${({ theme }: any) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: 0.75em 1.5em;
  margin: 1em 0;
  background-color: ${({ theme }: any) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }: any) => theme.radii.medium};
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }: any) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }: any) => theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }: any) => theme.colors.error};
  margin: 1em 0;
`;

const Spinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

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

const UpdateMusic: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { musics, loading, error } = useSelector(
    (state: RootState) => state.music
  );

  const music = musics.find((m) => m.id === id);

  const [title, setTitle] = useState(music?.title || "");
  const [artist, setArtist] = useState(music?.artist || "");
  const [album, setAlbum] = useState(music?.album || "");
  const [genre, setGenre] = useState(music?.genre || "");
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (music) {
      setTitle(music.title);
      setArtist(music.artist);
      setAlbum(music.album);
      setGenre(music.genre);
    }
  }, [music]);

  const validateInputs = () => {
    const errors: string[] = [];
    if (!title.trim()) errors.push("Title is required.");
    if (!artist.trim()) errors.push("Artist is required.");
    if (!genre) errors.push("Genre is required.");
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const updatedData: Partial<Music> = {
      title,
      artist,
      album,
      genre,
    };

    // Dispatch the updateMusicRequest action with the music ID and updated data
    dispatch(updateMusicRequest({ id: id || "", data: updatedData }));
  };

  return (
    <MusicPlayerContainer>
      <h2>Update Music</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <Input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
          required
        />
        <Input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder="Album"
        />
        <Select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Genre
          </option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Select>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Update Music"}
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {formErrors.map((err, index) => (
          <ErrorMessage key={index}>{err}</ErrorMessage>
        ))}
      </Form>
    </MusicPlayerContainer>
  );
};

export default UpdateMusic;
