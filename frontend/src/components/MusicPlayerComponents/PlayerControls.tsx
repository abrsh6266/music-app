import React from 'react';
import styled from '@emotion/styled';
import { Box } from 'rebass';

const Controls = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }:any) => theme.space[3]}px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 ${({ theme }:any) => theme.space[2]}px;
  font-size: ${({ theme }:any) => theme.fontSizes[4]}px;
  color: ${({ theme }:any) => theme.colors.text};

  &:hover {
    color: ${({ theme }:any) => theme.colors.primary};
  }
`;

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ isPlaying, onPlayPause, onNext, onPrevious }) => (
  <Controls>
    <ControlButton onClick={onPrevious}>⏮</ControlButton>
    <ControlButton onClick={onPlayPause}>{isPlaying ? '⏸' : '▶️'}</ControlButton>
    <ControlButton onClick={onNext}>⏭</ControlButton>
  </Controls>
);

export default PlayerControls;
