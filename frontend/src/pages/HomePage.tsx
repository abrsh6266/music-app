import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchMusicsRequest } from "../features/music/musicSlice";
import MusicPlayer from "../components/MusicPlayerComponents/MusicPlayer";
import Box from "../components/Box";

const MusicPage: React.FC = () => {
  const dispatch = useDispatch();
  const { musics, loading, error } = useSelector(
    (state: RootState) => state.music
  );

  useEffect(() => {
    dispatch(fetchMusicsRequest());
  }, [dispatch]);

  return (
    <Box>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <MusicPlayer music={musics} />}
    </Box>
  );
};

export default MusicPage;
