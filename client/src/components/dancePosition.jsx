import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Text, Flex } from 'theme-ui';
import { Profile } from './index';

const DancePosition = observer(({ socketStore }) => {
  const {
    first,
    second,
    third,
    deviceUsers,
  } = socketStore;

  return (
    <Grid
      sx={{
        my: 'auto',
        gridTemplateColumns: '1fr 1fr 1fr',
        minHeight: '200px',
        gap: '0px',
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
              <Profile user= {device} />
              <Text variant="lb.lg" sx={{ textAlign: 'center' }}>{user}</Text>
            </Flex>
          )
        })}
        <Text variant="lb.sm" mt="auto">(1)</Text>
        <Text variant="lb.sm">Left</Text>
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
              <Profile user= {device} />
              <Text variant="lb.lg" sx={{ textAlign: 'center' }}>{user}</Text>
            </Flex>
          )
        })}
        <Text variant="lb.sm" mt="auto">(2)</Text>
        <Text variant="lb.sm">Middle</Text>
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
              <Profile user= {device}/>
              <Text variant="lb.lg" sx={{ textAlign: 'center' }}>{user}</Text>
            </Flex>
          )
        })}
        <Text variant="lb.sm" mt="auto">(3)</Text>
        <Text variant="lb.sm">Right</Text>
      </Flex>
    </Grid>
  )
});

export default DancePosition;