import React, { useEffect } from 'react';
import { Flex, Text, Grid } from 'theme-ui';
import { Button } from '.';
import offlineStore from '../store/offlineStore';
import { observer } from 'mobx-react';
import { AccuracyGraph, PositionReport, DanceReport, PercentageCard } from './';
const Report = observer((props) => {
  const {
    accuracy,
    numPositions,
    getSessionMoves,
    getSessionPositions
  } = offlineStore;
  
  useEffect(() => {
    getSessionMoves(props.sid);
    getSessionPositions(props.sid);
  }, [props.sid])

  useEffect(() => {
    console.log("SESSION: ", props.sid);
  }, [props.sid]);

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
          overflow: 'scroll'
        }}
      >
        <Text variant="hd.lg" color="primary">Congratulations on completing session {props.sid}!</Text>
        <Grid
          mt="3"
          sx={{
            gridTemplateColumns: ['1fr', '1fr 50% 1fr'],
            maxWidth: '1500px',
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 'calc(100vh - 250px)'
            }}
          >
            <Text variant="hd.sm" mb="3" sx={{ textAlign: 'center' }}>Dance Moves Predicted</Text>
            <DanceReport/>
          </Flex>
          <Flex
            sx={{
              flexDirection: 'column',
            }}
          >
            <Text variant="hd.sm" mb="3" sx={{ width: '100%', textAlign: 'center' }}>Position Accuracy</Text>
            <AccuracyGraph accuracy={accuracy} totalPositions={numPositions}/>
            <Text variant="hd.sm" mb="3" sx={{ width: '100%', textAlign: 'center' }}>Percentage</Text>
            <PercentageCard accuracy={accuracy} totalPositions={numPositions}/>
          </Flex>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 'calc(100vh - 250px)'
            }}
          >
            <Text variant="hd.sm" mb="3" sx={{ textAlign: 'center' }}>Position Changes</Text>
            <PositionReport/>
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  )
});

export default Report;