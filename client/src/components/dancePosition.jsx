import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
// import socketStore from '../store/store';
import { Grid, Box, Text } from 'theme-ui';

const DancePosition = observer(({ socketStore }) => {
  const {
    first,
    second,
    third,
    // isUpdated
  } = socketStore;

  useEffect(() => {
    console.log("FIRST", first);
    console.log("SECOND", second);
    console.log("THIRD", third);
  }, [first, second, third])
  return (
    <Grid
      sx={{
        gridTemplateColumns: '1fr 1fr 1fr'
      }}
    >
      <Box>
        {first.map((user) => (
          <Text variant="lb.sm">{user}</Text>
        ))}
      </Box>
      <Box>
        {second.map((user) => (
          <Text variant="lb.sm">{user}</Text>
        ))}
      </Box>
      <Box>
        {third.map((user) => (
          <Text variant="lb.sm">{user}</Text>
        ))}
      </Box>
    </Grid>
  )
});

export default DancePosition;