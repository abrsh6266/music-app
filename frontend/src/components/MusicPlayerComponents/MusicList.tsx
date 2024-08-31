import React from 'react';
import styled from '@emotion/styled';
import { Box } from 'rebass';
import LoadingBars from './LoadingBars';

const Loader = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 4em;
  padding-left: ${({ theme }) => theme.space[4]}px;
  padding-right: ${({ theme }) => theme.space[4]}px;
  transform: rotate(180deg);
  justify-content: flex-end;
  border-radius: ${({ theme }) => theme.radii.medium};
  transition: 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const Song = styled(Box)`
  position: relative;
  transform: rotate(180deg);
  margin-right: ${({ theme }) => theme.space[4]}px;
  color: ${({ theme }) => theme.colors.text};
  align-self: center;
`;

const Artist = styled(Box)`
  font-size: ${({ theme }) => theme.fontSizes[1]}px;
`;

const AlbumCover = styled(Box)`
  position: relative;
  margin-right: ${({ theme }) => theme.space[4]}px;
  height: 40px;
  width: 40px;
  background-color: rgb(233, 232, 232);
  align-self: center;
  border-radius: ${({ theme }) => theme.radii.small};
`;

const PlayButton = styled(Box)`
  position: relative;
  left: 0.35em;
  height: 1.6em;
  width: 1.6em;
  clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);
  background-color: ${({ theme }) => theme.colors.text};
  transform: rotate(-90deg);
  align-self: center;
  margin-top: 0.7em;
  justify-self: center;
`;

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
}

const MusicList: React.FC<MusicListProps> = ({ music, currentTrack, isPlaying, handlePlayPause }) => (
  <>
    {music.map((track, index) => (
      <Loader key={index} onClick={() => handlePlayPause(track)}>
        <Song>
          <Box as="p" className="name">{track.title}</Box>
          <Artist>{track.artist}</Artist>
        </Song>
        <AlbumCover />
        {currentTrack?.file === track.file && isPlaying ? <LoadingBars /> : <PlayButton />}
      </Loader>
    ))}
  </>
);

export default MusicList;
