import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { MusicPlayerContainer } from "../components/Container";
import MusicPlayer from "../components/MusicPlayerComponents/MusicPlayer";
import { RootState } from "../store";
import { fetchMusicsRequest } from "../features/music/musicSlice";
import LoadingComponent from "../components/Alerts/LoadingComponent";

const GenreContainer = styled(MusicPlayerContainer)`
  padding: 2em;
`;

const GenreMusicPage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>();
  const dispatch = useDispatch();
  const { musics, loading, error } = useSelector(
    (state: RootState) => state.music
  );
  useEffect(() => {
    if (genre) {
      dispatch(fetchMusicsRequest({ search: genre }));
    }
  }, [dispatch, genre]);

  return (
    <GenreContainer>
      <h2>Genre: {genre}</h2>
      {loading && <LoadingComponent />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && musics.length > 0 && (
        <MusicPlayer music={musics} />
      )}
      {!loading && !error && musics.length === 0 && (
        <p>No music found for this genre.</p>
      )}
    </GenreContainer>
  );
};

export default GenreMusicPage;
