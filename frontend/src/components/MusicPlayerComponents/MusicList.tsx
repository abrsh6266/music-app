import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box } from "rebass";
import LoadingBars from "./LoadingBars";

// Styled components for various elements
const Loader = styled(Box)<{ isActive: boolean }>`
  /* Add isActive prop */
  display: flex;
  flex-direction: row;
  height: 4em;
  padding-left: ${({ theme }: any) => theme.space[4]}px;
  padding-right: ${({ theme }: any) => theme.space[4]}px;
  transform: rotate(180deg);
  justify-content: flex-end;
  transition: 0.4s ease-in-out;
  cursor: pointer;
  position: relative;
  background-color: ${({ isActive, theme }: any) =>
    isActive
      ? theme.colors.lightGray
      : "transparent"}; /* Change background color when active */

  &:hover {
    background-color: ${({ theme }: any) => theme.colors.lightGray};
  }
`;

const Song = styled(Box)`
  position: relative;
  transform: rotate(180deg);
  margin-right: ${({ theme }: any) => theme.space[4]}px;
  color: ${({ theme }: any) => theme.colors.text};
  align-self: center;
`;

const Artist = styled(Box)`
  font-size: ${({ theme }: any) => theme.fontSizes[1]}px;
`;

const PlayButton = styled(Box)`
  position: relative;
  left: 0.35em;
  height: 1.6em;
  width: 1.6em;
  clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);
  background-color: ${({ theme }: any) => theme.colors.text};
  transform: rotate(-90deg);
  align-self: center;
  margin-top: 0.7em;
  justify-self: center;
`;

const Dropdown = styled(Box)`
  top: 2.5em; /* Adjusted position to align correctly with the button */
  right: 0; /* Align to the right of the parent */
  background-color: white;
  border: 1px solid ${({ theme }: any) => theme.colors.lightGray};
  border-radius: ${({ theme }: any) => theme.radii.small};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: ${({ show }: { show: boolean }) => (show ? "block" : "none")};
`;

const Cont = styled(Box)`
  margin-right: auto;
`;
const DropdownItem = styled(Box)`
  padding: ${({ theme }: any) => theme.space[2]}px;
  cursor: pointer;
  transform: rotate(180deg);
  &:hover {
    background-color: ${({ theme }: any) => theme.colors.lightGray};
  }
`;

const DropdownButton = styled(Box)`
  margin-right: auto;
  cursor: pointer;
  padding: 1.2em;
  font-size: 1.2em;
`;

// Types for props
interface Music {
  title: string;
  artist: string;
  album: string;
  file: string;
}

interface MusicListProps {
  music: Music[];
  currentTrack: Music | null;
  isPlaying: boolean;
  handlePlayPause: (track: Music) => void;
  handleEdit: (track: Music) => void; // Edit handler
  handleDelete: (track: Music) => void; // Delete handler
}

const MusicList: React.FC<MusicListProps> = ({
  music,
  currentTrack,
  isPlaying,
  handlePlayPause,
  handleEdit,
  handleDelete,
}) => {
  // State for managing the visibility of dropdowns
  const [dropdownVisible, setDropdownVisible] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | null>(
    null
  ); // State to track selected item

  // Toggle dropdown visibility
  const toggleDropdown = (index: number) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Handle item click
  const handleItemClick = (track: Music, index: number) => {
    setSelectedTrackIndex(index); // Set the selected index
    handlePlayPause(track);
  };

  return (
    <>
      {music.map((track, index) => (
        <Loader
          key={index}
          isActive={selectedTrackIndex === index} // Apply active style if selected
          onClick={() => handleItemClick(track, index)}
        >
          <Cont>
            <DropdownButton
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(index);
              }}
            >
              ⋮
            </DropdownButton>
            <Dropdown show={!!dropdownVisible[index]}>
              <DropdownItem onClick={() => handleEdit(track)}>
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => handleDelete(track)}>
                Delete
              </DropdownItem>
            </Dropdown>
          </Cont>

          <Song>
            <Box as="p" className="name">
              {track.title}
            </Box>
            <Artist>{track.artist}</Artist>
          </Song>
          {currentTrack?.file === track.file && isPlaying ? (
            <LoadingBars />
          ) : (
            <PlayButton />
          )}
        </Loader>
      ))}
    </>
  );
};

export default MusicList;
