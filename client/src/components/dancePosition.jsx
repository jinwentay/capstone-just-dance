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
    deviceUsers,
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
        gridTemplateColumns: '1fr 1fr 1fr',
        minHeight: '300px',
      }}
    >
      <Flex
        sx={{
          borderRight: '1px solid',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {first.map((user) => {
          const device = Object.keys(deviceUsers).find(key => deviceUsers[key] === user);
          return (
            <Flex
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                my: 2,
              }}
            >
              <Profile user= {device} isSelf={user === dashboardStore.account.username} />
              <Text variant="lb.sm" sx={{ textAlign: 'center' }}>{user}</Text>
            </Flex>
          )
        })}
        <Text variant="lb.sm" mt="auto">One</Text>
      </Flex>
      <Flex
        sx={{
          borderRight: '1px solid',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {second.map((user) => {
          const device = Object.keys(deviceUsers).find(key => deviceUsers[key] === user);
          return (
            <Flex
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                my: 2,
              }}
            >
              <Profile user= {device} isSelf={user === dashboardStore.account.username} />
              <Text variant="lb.sm" sx={{ textAlign: 'center' }}>{user}</Text>
            </Flex>
          )
        })}
        <Text variant="lb.sm" mt="auto">Two</Text>
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {third.map((user) => {
          const device = Object.keys(deviceUsers).find(key => deviceUsers[key] === user);
          return (
            <Flex
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                my: 2,
              }}
            >
              <Profile user= {device} isSelf={user === dashboardStore.account.username} />
              <Text variant="lb.sm" sx={{ textAlign: 'center' }}>{user}</Text>
            </Flex>
          )
        })}
        <Text variant="lb.sm" mt="auto">Three</Text>
      </Flex>
    </Grid>
  )
});

export default DancePosition;