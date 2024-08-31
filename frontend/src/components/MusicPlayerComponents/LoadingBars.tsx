import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Box } from 'rebass';

const playAnimation = keyframes`
  0% { height: 0.2em; }
  25% { height: 0.7em; }
  50% { height: 1.5em; }
  100% { height: 0.2em; }
`;

const Loading = styled(Box)`
  display: flex;
  margin-top: ${({ theme }:any) => theme.space[4]}px;
  margin-left: ${({ theme }:any) => theme.space[2]}px;
`;

const LoadBar = styled(Box)`
  width: 2px;
  height: 33px;
  background-color: ${({ theme }:any) => theme.colors.limeGreen};
  animation: ${playAnimation} 1s infinite;
  border-radius: ${({ theme }:any) => theme.radii.small};
  margin: ${({ theme }:any) => theme.space[1]}px;

  &:nth-of-type(1) { animation-delay: 0.2s; }
  &:nth-of-type(2) { animation-delay: 0.4s; }
  &:nth-of-type(3) { animation-delay: 0.6s; }
`;

const LoadingBars: React.FC = () => (
  <Loading>
    <LoadBar />
    <LoadBar />
    <LoadBar />
    <LoadBar />
  </Loading>
);

export default LoadingBars;
