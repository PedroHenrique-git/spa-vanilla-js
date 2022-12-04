import { createStitches } from '@stitches/core';

export const { css, globalCss } = createStitches({
  media: {
    mobile: '(max-width: 1024px)',
    tablet: '(max-width: 768px)',
    notebook: '(max-width: 1366px)',
  },
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      gray: '#ccc',
    },
    fonts: {
      principal: 'Roboto, sans-serif',
    },
    space: {
      sp1: '1rem',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      thin: 100,
    },
  },
});
