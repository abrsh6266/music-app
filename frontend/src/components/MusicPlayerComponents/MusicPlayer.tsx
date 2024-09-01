import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Box } from "rebass";
import MusicList from "./MusicList";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Music {
  id?: string;
  title: string;
  artist: string;
  album: string;
  file: string;
  userId: string;
}

interface MusicPlayerProps {
  music: Music[];
}

const Main = styled(Box)`
  background-color: ${({ theme }: any) => theme.colors.white};
  padding: ${({ theme }: any) => theme.space[4]}px;
  padding-bottom: ${({ theme }: any) => theme.space[5]}px;
  border-radius: ${({ theme }: any) => theme.radii.large};
  margin: ${({ theme }: any) => theme.space[4]}px;
`;

const MusicPlayer: React.FC<MusicPlayerProps> = ({ music }) => {
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.id); // Get logged-in user ID

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
      const currentIndex = music.findIndex(
        (track) => track.file === currentTrack.file
      );
      const nextTrack = music[(currentIndex + 1) % music.length];
      handlePlayPause(nextTrack);
    }
  };

  const handlePreviousTrack = () => {
    if (currentTrack) {
      const currentIndex = music.findIndex(
        (track) => track.file === currentTrack.file
      );
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

  const handleEdit = (track: Music) => {
    navigate(`/update-music/${track.id}`); // Navigate to the edit page
  };

  const handleDelete = (track: Music) => {
    // Implement deletion logic here
    console.log("Delete music:", track);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <Main>
      <MusicList
        music={music}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        userId={userId} // Pass the logged-in user's ID
      />

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

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextTrack}
      />
    </Main>
  );
};

export default MusicPlayer;
