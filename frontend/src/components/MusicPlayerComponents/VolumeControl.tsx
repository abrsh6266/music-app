import React from 'react';
import styled from '@emotion/styled';

const VolumeControlWrapper = styled.input`
  width: 100px;
  margin-left: ${({ theme }) => theme.space[3]}px;
`;

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => (
  <VolumeControlWrapper type="range" min="0" max="1" step="0.01" value={volume} onChange={onVolumeChange} />
);

export default VolumeControl;
