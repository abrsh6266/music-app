import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box } from "rebass";
import LoadingBars from "./LoadingBars";
import { FaHamburger, FaTimes } from "react-icons/fa";

// Styled components for various elements
const Loader = styled(Box)<{ isActive: boolean }>`
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
    isActive ? theme.colors.lightGray : "transparent"};

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
  position: absolute;
  margin-right: auto;
  top: 2.5em;
  background-color: white;
  border: 1px solid ${({ theme }: any) => theme.colors.lightGray};
  border-radius: ${({ theme }: any) => theme.radii.small};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: ${({ show }: { show: boolean }) => (show ? "block" : "none")};
`;

const Cont = styled(Box)`
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
`;
const DropdownItem = styled(Box)`
  padding: ${({ theme }: any) => theme.space[2]}px;
  cursor: pointer;
  transform: rotate(180deg);
  &:hover {
    background-color: ${({ theme }: any) => theme.colors.lightGray};
  }
`;
const DropdownItem2 = styled(Box)`
  padding: ${({ theme }: any) => theme.space[2]}px;
  cursor: pointer;
  transform: rotate(180deg);
  &:hover {
    background-color: ${({ theme }: any) => theme.colors.lightGray};
  }
`;


// Types for props
interface Music {
  title: string;
  artist: string;
  album: string;
  file: string;
  userId: string;
}

interface MusicListProps {
  music: Music[];
  currentTrack: Music | null;
  isPlaying: boolean;
  handlePlayPause: (track: Music) => void;
  handleEdit: (track: Music) => void; // Edit handler
  handleDelete: (track: Music) => void; // Delete handler
  userId: string | null; // Logged-in user ID
}

const MusicList: React.FC<MusicListProps> = ({
  music,
  currentTrack,
  isPlaying,
  handlePlayPause,
  handleEdit,
  handleDelete,
  userId,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState<{
    [key: number]: boolean;
  }>({});
  const [dropdownVisible2, setDropdownVisible2] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const toggleDropdown2 = (index: number) => {
    setDropdownVisible2((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleItemClick = (track: Music, index: number) => {
    setSelectedTrackIndex(index);
    handlePlayPause(track);
  };

  return (
    <>
      {music.map((track, index) => (
        <Loader
          key={index}
          isActive={selectedTrackIndex === index}
          onClick={() => handleItemClick(track, index)}
        >
          {userId === track.userId ? (
            <Cont>
              <FaHamburger
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(index);
                }}
              />
              <Dropdown show={!!dropdownVisible[index]}>
                <DropdownItem onClick={() => handleEdit(track)}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={() => handleDelete(track)}>
                  Delete
                </DropdownItem>
              </Dropdown>
            </Cont>
          ) : (
            <Cont>
              <FaTimes
                onPointerEnter={(e) => {
                  e.stopPropagation();
                  toggleDropdown2(index);
                }}
                onPointerLeave={(e) => {
                  e.stopPropagation();
                  toggleDropdown2(index);
                }}
              />
              <Dropdown show={!!dropdownVisible2[index]}>
                <DropdownItem2>
                  you are not allowed. you are not creator
                </DropdownItem2>
              </Dropdown>
            </Cont>
          )}

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
