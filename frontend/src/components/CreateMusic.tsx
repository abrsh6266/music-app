import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMusicRequest } from "../features/music/musicSlice";
import { RootState } from "../store";

const CreateMusic = () => {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
        required
      />
      <input
        type="text"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        placeholder="Album"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Music"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CreateMusic;
