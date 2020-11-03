import React, { useEffect, useState } from 'react';
import { Flex, Text, Box, Grid } from 'theme-ui';
import { Button } from '.';
import offlineStore from '../store/offlineStore';
import { observer } from 'mobx-react';
import { AccuracyGraph, PositionReport } from './';
const Report = observer((props) => {
  const {
    sessionMoves,
    getUserSessions, 
    accuracy,
    numPositions
  } = offlineStore;
  
  useEffect(() => {
    getUserSessions();
  }, [])

  useEffect(() => {
    console.log("SESSION MOVES: ", sessionMoves);
  }, [sessionMoves]);

  return (
    <Flex
      sx={{
        minWidth: '100vw',
        minHeight: '100vh',
        background: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '0px',
        top: '0px',
        zIndex: 3,
      }}
    >
      <Button 
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px'
        }}
        onClick={props.close}
      >
        X
      </Button>
      <Flex
        mx="3"
        sx={{
          p: 3,
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: '2px solid primary',
          width: '100%',
          height: 'calc(100vh - 200px)',
          alignItems: 'center',
        }}
      >
        <Text variant="hd.lg" color="primary">Congratulations on completing the session!</Text>
        <Grid
          mt="3"
          sx={{
            gridTemplateColumns: ['1fr', 'auto 1fr auto'],
            gridTemplateRows: '1fr',
            width: '100%',
          }}
        >
          <Flex
            sx={{
              justifyContent: 'center'
            }}
          >
            <Text variant="lb.lg" mb="3">Dance Moves Predicted</Text>
          </Flex>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text variant="lb.lg" mb="3">Position Accuracy</Text>
            <AccuracyGraph accuracy={accuracy} totalPositions={numPositions}/>
          </Flex>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text variant="lb.lg" mb="3">Position Changes</Text>
            <PositionReport/>
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  )
});

export default Report;