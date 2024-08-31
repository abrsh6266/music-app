import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMusicRequest } from "../features/music/musicSlice";
import { RootState } from "../store";
import { MusicPlayerContainer } from "./Container";
import styled from "@emotion/styled";

// Styled components for form elements and layout
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 2em auto;
  padding: 2em;
  background-color: ${({ theme }:any) => theme.colors.background};
  border-radius: ${({ theme }:any) => theme.radii.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75em 1em;
  margin: 0.5em 0;
  border: 1px solid ${({ theme }:any) => theme.colors.lightGray};
  border-radius: ${({ theme }:any) => theme.radii.small};
  font-size: 1em;
  outline: none;

  &:focus {
    border-color: ${({ theme }:any) => theme.colors.primary};
  }
`;

const FileInput = styled.input`
  padding: 0.75em 1em;
  margin: 0.5em 0;
  border: none;
  background-color: ${({ theme }:any) => theme.colors.lightGray};
  color: ${({ theme }:any) => theme.colors.text};
  border-radius: ${({ theme }:any) => theme.radii.small};
  font-size: 1em;
  cursor: pointer;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 0.75em 1.5em;
  margin: 1em 0;
  background-color: ${({ theme }:any) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }:any) => theme.radii.medium};
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }:any) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }:any) => theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }:any) => theme.colors.error};
  margin: 1em 0;
`;

const CreateMusic: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.music);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const musicData = {
        title,
        artist,
        album,
        genre,
        file,
      };

      // Dispatch the createMusicRequest action with raw data
      dispatch(createMusicRequest(musicData));
    }
  };

  return (
    <MusicPlayerContainer>
      <h2>Add New Music</h2>
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
        <Input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          required
        />
        <FileInput
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Music"}
        </SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </MusicPlayerContainer>
  );
};

export default CreateMusic;
