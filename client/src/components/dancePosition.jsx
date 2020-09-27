import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
// import socketStore from '../store/store';
import { Grid, Box, Text, Flex } from 'theme-ui';
import { Profile } from './index';
import dashboardStore from '../store/dashboardStore';

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
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {first.map((user) => (
          <>
            <Profile user1= {true} isSelf={user === dashboardStore.account.username} />
            <Text variant="lb.sm">{user}</Text>
          </>
        ))}
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {second.map((user) => (
          <>
            <Profile user2= {true} isSelf={user === dashboardStore.account.username} />
            <Text variant="lb.sm">{user}</Text>
          </>
        ))}
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {third.map((user) => (
          <>
            <Profile user3= {true} isSelf={user === dashboardStore.account.username} />
            <Text variant="lb.sm">{user}</Text>
          </>
        ))}
      </Flex>
    </Grid>
  )
});

export default DancePosition;