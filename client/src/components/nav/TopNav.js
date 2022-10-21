import React from 'react';
import { Container, Grid, GridItem } from '@chakra-ui/react'
import './nav.scss';

export function TopNav() {
  return (
    <Container>
      <div className='top-nav-container'>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          <GridItem w='100%' h='10' bg='blue.500'>
            Sovereign Chains 
          </GridItem>    
          <GridItem w='100%' h='10' bg='blue.500'>
            Connected to 
          </GridItem>    
          <GridItem w='100%' h='10' bg='blue.500'>
            Connected chain
          </GridItem>   
          <GridItem w='100%' h='10' bg='blue.500' />
          <GridItem w='100%' h='10' bg='blue.500' />
        </Grid>
      </div>
      <div>
      </div>
    </Container>
  )
}