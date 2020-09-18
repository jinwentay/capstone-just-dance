import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Card, DancePosition } from '../components';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';
import socketStore from '../store/store';
import { Grid, Box, Flex, Text, Button, Select } from 'theme-ui';

const deviceOptions = [
  {
    text: 'Device 1',
    value: 1
  },
  {
    text: 'Device 2',
    value: 2
  },
  {
    text: 'Device 3',
    value: 3
  },
];

const Home = observer(() => {
  const history = useHistory();
  const { account } = dashboardStore;
  const {
    startSession,
    joinedSession,
    leaveSession,
  } = socketStore;
  useEffect(() => {
    console.log(account);
    if (account.id === -1) {
      history.push('/login');
    }
  }, [account, history])

  const [selectedDevice, setDevice] = useState('1');

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      overflow: 'scroll' 
    }}>
      <Navbar/>
      {startSession ? (
        <Grid
          sx={{
            m: 3,
            height: 'calc(100vh - 100px)',
            gridTemplateColumns: ['1fr','1fr 300px'],
            gridTemplateRows: ['repeat(4, 320px)','1fr 320px']
          }}
        >
          <Card title='DANCE POSITIONS' children={<DancePosition socketStore={socketStore}/>}/>
          <Card title='DANCE POSITIONS' children={<div/>}/>
          <Card title='DANCE POSITIONS' children={<div/>}/>
          <Card title='DANCE POSITIONS' children={<div/>}/>
        </Grid>
      ) : (
        <Flex
          sx={{
            alignItems: 'center',
            flexDirection: 'column',
            p: '16px',
            fontFamily: 'Quicksand',
            height: '100vh'
          }}
        >
          <Text variant="lb.md" mb="3" sx={{ textAlign: 'center' }}>Choose your wearable</Text>
          <Select
            name="device"
            defaultValue={deviceOptions[0].value}
            onChange={(e) => {
              setDevice(`${e.target.value}`)
            }}
            sx={{
              width: '300px'
            }}
          >
            {deviceOptions.map((device) => (
              <option value={device.value}>{device.text}</option>
            ))}
          </Select>
          <Button
            variant="default"
            sx={{
              mt: 2,
              width: '300px',
            }}
            onClick={() => joinedSession(selectedDevice)}
          >
            Start session
          </Button>
        </Flex>
      )}
    </Box>
  )
});

export default Home;