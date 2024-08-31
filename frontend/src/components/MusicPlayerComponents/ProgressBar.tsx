import React from 'react';
import styled from '@emotion/styled';

const ProgressBarWrapper = styled.input`
  width: 100%;
  margin: ${({ theme }:any) => theme.space[3]}px 0;
`;

interface ProgressBarProps {
  duration: number;
  currentTime: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, currentTime, onSeek }) => (
  <ProgressBarWrapper type="range" min="0" max={duration} value={currentTime} onChange={onSeek} />
);

export default ProgressBar;
