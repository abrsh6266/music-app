import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Box } from 'rebass';
import MusicList from './MusicList';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

interface Music {
  title: string;
  artist: string;
  album: string;
  file: string;
}

interface MusicPlayerProps {
  music: Music[];
}

const Main = styled(Box)`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[4]}px;
  padding-bottom: ${({ theme }) => theme.space[5]}px;
  border-radius: ${({ theme }) => theme.radii.large};
  margin: ${({ theme }) => theme.space[4]}px;
`;

const MusicPlayer: React.FC<MusicPlayerProps> = ({ music }) => {
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = (track: Music) => {
    if (currentTrack?.file === track.file) {
      if (audioRef.current?.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    } else {
      setCurrentTrack(track);
      if (audioRef.current) {
        audioRef.current.src = track.file;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleNextTrack = () => {
    if (currentTrack) {
      const currentIndex = music.findIndex(track => track.file === currentTrack.file);
      const nextTrack = music[(currentIndex + 1) % music.length];
      handlePlayPause(nextTrack);
    }
  };

  const handlePreviousTrack = () => {
    if (currentTrack) {
      const currentIndex = music.findIndex(track => track.file === currentTrack.file);
      const prevTrack = music[(currentIndex - 1 + music.length) % music.length];
      handlePlayPause(prevTrack);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <Main>
      <MusicList music={music} currentTrack={currentTrack} isPlaying={isPlaying} handlePlayPause={handlePlayPause} />

      {currentTrack && (
        <>
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={() => handlePlayPause(currentTrack)}
            onNext={handleNextTrack}
            onPrevious={handlePreviousTrack}
          />
          <ProgressBar
            duration={audioRef.current?.duration || 0}
            currentTime={currentTime}
            onSeek={handleSeek}
          />
          <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
        </>
      )}

      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleNextTrack} />
    </Main>
  );
};

export default MusicPlayer;
