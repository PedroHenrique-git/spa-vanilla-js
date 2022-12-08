import { globalCss } from '../stitches.config';

export const globalStyles = globalCss({
  '*': {
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',

    color: '$black',
    fontFamily: '$principal',
    fontWeight: '$medium',
    fontSize: 'medium',
  },

  html: {
    fontSize: '62.5%',
  },

  button: {
    border: 'none',
    background: '#cecece',
    padding: '.5rem',
    cursor: 'pointer',

    '&:hover': {
      opacity: '.4',
      transition: 'opacity 300ms ease-in-out',
    },
  },

  '.content': {
    maxWidth: '1440px',
    minHeight: '100vh',
    width: '100%',
    margin: '0 auto',
    padding: '$sp1',
  },
});
