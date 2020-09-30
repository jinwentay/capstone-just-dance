import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Flex, Box, Text } from 'theme-ui';
import Dancer from '../icons/avatar.png';

const DanceMove = observer(({ socketStore }) => {
  const {
    currDanceMove
    // isUpdated
  } = socketStore;

  useEffect(() => {
    console.log(currDanceMove);
  }, [currDanceMove])
  return (
    <Flex
      sx={{
        my: 'auto',
        // justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img src={Dancer} style={{ width: '250px' }}/>
      <Box>
        <Text variant="hd.md" color="primary">{currDanceMove ? currDanceMove : "Generating prediction..."}</Text>
      </Box>
    </Flex>
  )
});

export default DanceMove;