import styled from '@emotion/styled';
import { space, layout, color, typography } from 'styled-system';

const Card = styled('div')(
  {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  space,
  layout,
  color,
  typography,
);

export default Card;
