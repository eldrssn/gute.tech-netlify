const theme = {
  container: {
    background: 'black',
    zIndex: 2001,
  },
  arrow: {
    minHeight: '100%',
    top: '10px',
    minWidth: '30%',
    paddingRight: '10%',
    paddingLeft: '10%',

    '@media (max-width: 500px)': {
      minWidth: 40,
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
};

export { theme };
