import Head from 'next/head';
import Image from 'next/image';
import { Button, Container, Box, Typography } from '@mui/material';
import { FC } from 'react';
import Header from '../components/Header';

const Home: FC = () => {
  return (
    <Container>
      <Header />
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Gute.tech initialized
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
