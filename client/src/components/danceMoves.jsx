import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Flex, Box, Text, Spinner, Grid } from 'theme-ui';
import Dancer from '../icons/avatar.png';
import dashboardStore from '../store/dashboardStore';
const danceMove = {
  'rest': 'REST',
  'zigzag': 'ZIGZAG', 
  'elbowlock': 'ELBOWLOCK', 
  'hair': 'HAIR', 
  'pushback': 'PUSHBACK', 
  'rocket': 'ROCKET', 
  'scarecrow': 'SCARECROW', 
  'shouldershrug': 'SHOULDER SHRUG', 
  'windowwipe': 'WINDOW WIPE', 
  'logout': 'LOGOUT'
};
const DanceMove = observer(({ socketStore }) => {
  const {
    currDanceMove,
    currMoveOthers
  } = socketStore;

  return (
    <Grid
      sx={{
        gridTemplateColumns: '[first] 50% [second] 50% [end]',
        gridTemplateRows: '[row-start] 50% [row-second] 50% [row-end]',
        height: '100%',
        gap: '0px',
        minHeight: '200px'
      }}
    >
      <Flex
        sx={{
          gridColumnStart: 1,
          gridColumnEnd: 'end',
          gridRowStart: 1,
          gridRowEnd: 'row-second',
          alignSelf: 'stretch',
          justifySelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderBottom: '1px solid black',
        }}
      >
        <Box 
          sx={{ 
            px: 2,
            py: 1, 
            position: 'absolute',
            top: 0,
            right: 0,
            border: '1px solid #3E4C59', 
            textAlign: 'center', 
            color: 'gray700',
            fontFamily: 'Quicksand'
          }}
        >
          {dashboardStore.account.username}
        </Box>
        <Text variant="hd.xl" color="primary" sx={{ textOverflow: 'ellipsis' }}>{currDanceMove ? danceMove[currDanceMove] : "Generating prediction..."}</Text>
      </Flex>
      {Object.entries(currMoveOthers).map(([key, value], index) => (
        <>
          {index === 0 ? (
            <Flex
              sx={{
                gridColumnStart: 1,
                gridColumnEnd: 'second',
                gridRowStart: 2,
                gridRowEnd: 'row-end',
                alignSelf: 'stretch',
                justifySelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderRight: '1px solid black',
              }}
            >
              <Box 
                sx={{ 
                  px: 2,
                  py: 1, 
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  borderLeft: '1px solid #3E4C59', 
                  borderBottom: '1px solid #3E4C59', 
                  textAlign: 'center', 
                  color: 'gray700',
                  fontFamily: 'Quicksand'
                }}
              >
                {key}
              </Box>
              <Text m="auto" variant="hd.lg" color="text">{danceMove[value]}</Text>
            </Flex>
          ) : (
            <Flex
              sx={{
                gridColumnStart: 2,
                gridColumnEnd: 'end',
                gridRowStart: 2,
                gridRowEnd: 'row-end',
                alignSelf: 'stretch',
                justifySelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Box 
                sx={{
                  px: 2,
                  py: 1, 
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  borderLeft: '1px solid #3E4C59', 
                  borderBottom: '1px solid #3E4C59',  
                  textAlign: 'center', 
                  color: 'gray700',
                  fontFamily: 'Quicksand'
                }}
              >
                {key}
              </Box>
              <Text m="auto" variant="hd.lg" color="text">{danceMove[value]}</Text>
            </Flex>
          )}
        </>
      ))}
    </Grid>
  )
});

export default DanceMove;