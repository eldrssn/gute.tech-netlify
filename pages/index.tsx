import Head from 'next/head';
import Image from 'next/image';
import { Button, Box, Typography } from '@mui/material';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Gute.tech initialized
      </Typography>
    </Box>
  );
};

export default Home;
