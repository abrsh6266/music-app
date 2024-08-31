import styled from "@emotion/styled";
import { Box } from "rebass";
import {
  space,
  layout,
  color,
  border,
  typography,
  flexbox,
} from "styled-system";

// Define the container using styled-components and styled-system
export const MusicPlayerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px; /* Increased padding for a larger feel */
  margin: 10px auto; /* Slightly more margin for spacing */
  border-radius: 16px; /* Slightly larger radius for a softer look */
  box-shadow: 0 25px 25px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.background};
  max-width: 1400px; /* Increased max-width for a larger container */
  width: 90%; /* Ensure it scales well on different screen sizes */
  min-height: 600px; /* Set a minimum height to make it more prominent */

  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
  ${flexbox}
`;
