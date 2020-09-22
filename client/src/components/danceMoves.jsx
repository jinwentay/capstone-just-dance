import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Grid, Box, Text } from 'theme-ui';

const DanceMove = observer(({ socketStore }) => {
  const {
    currDanceMove
    // isUpdated
  } = socketStore;

  useEffect(() => {
    console.log(currDanceMove);
  }, [currDanceMove])
  return (
    <Text variant="hd.md">{currDanceMove}</Text>
  )
});

export default DanceMove;