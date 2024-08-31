import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { RootState } from "../store";
import { fetchMusicsRequest } from "../features/music/musicSlice";
import MusicPlayer from "../components/MusicPlayerComponents/MusicPlayer";
import { MusicPlayerContainer } from "../components/Container";
import styled from "@emotion/styled";
import LoadingComponent from "../components/Alerts/LoadingComponent";

const Cont = styled("div")`
  margin-left: 30px;
`;
// Styled component for Add Music Button
const AddMusicButton = styled.button`
  padding: 0.5em 1em;
  margin: 1em 0;
  background-color: ${({ theme }: any) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }: any) => theme.radii.medium};
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: ${({ theme }: any) => theme.colors.secondary};
  }
`;

const MusicPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { musics, loading, error } = useSelector(
    (state: RootState) => state.music
  );

  useEffect(() => {
    dispatch(fetchMusicsRequest({ search: "" }));
  }, [dispatch]);

  // Navigate to Add Music page
  const handleAddMusicClick = () => {
    navigate("/add-music"); // Navigate to the Add Music page
  };

  return (
    <MusicPlayerContainer>
      <Cont>
        <AddMusicButton onClick={handleAddMusicClick}>Add Music</AddMusicButton>
      </Cont>
      {loading && <LoadingComponent />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <MusicPlayer music={musics} />}
    </MusicPlayerContainer>
  );
};

export default MusicPage;
