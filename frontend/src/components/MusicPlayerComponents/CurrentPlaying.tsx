import React from 'react';
import styled from '@emotion/styled';
import { Box } from 'rebass';

const CurrentPlayingWrapper = styled(Box)`
  display: flex;
  margin: ${({ theme }:any) => theme.space[4]}px;
`;

const SpotifyIcon = styled.svg`
  width: 50px;
  height: 50px;
  margin-right: ${({ theme }:any) => theme.space[3]}px;
`;

const Heading = styled(Box)`
  color: ${({ theme }:any) => theme.colors.text};
  font-size: ${({ theme }:any) => theme.fontSizes[4]}px;
  font-weight: bold;
  align-self: center;
`;

const CurrentPlaying: React.FC = () => {
  return (
    <CurrentPlayingWrapper>
      <SpotifyIcon
        height="50px"
        width="50px"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className="spotify"
      >
        {/* Spotify icon paths */}
      </SpotifyIcon>
      <Heading>Currently Playing</Heading>
    </CurrentPlayingWrapper>
  );
};

export default CurrentPlaying;
