import styled from '@emotion/styled';
import { space, color, typography } from 'styled-system';

const Button = styled('button')(
  {
    appearance: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  space,
  color,
  typography,
);

export default Button;
