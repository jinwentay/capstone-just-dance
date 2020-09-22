import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Card, DancePosition, STabs, STabList, STab, STabPanels, STabPanel, Button } from '../components';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';
import socketStore from '../store/store';
import { Grid, Box, Flex, Text, Select } from 'theme-ui';
import ls from 'local-storage';

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
    createSession,
    sessions,
    getSession,
    joinedSession,
    joinState,
  } = socketStore;
  useEffect(() => {
    console.log(account);
    if (account.id === -1) {
      history.push('/login');
    }
  }, [account, history]);

  useEffect(() => {
    getSession();
  }, []);

  const [selectedSession, setSession] = useState();
  useEffect(() => {
    console.log('SESSIONS', sessions);
    if (sessions.length)
      setSession(sessions[0].sid)
  }, [sessions]);

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
        <STabs>
          <Flex sx={{ alignItems: 'center', flexDirection: 'column', mb: 3 }}>
            <Text variant="hd.lg" mb="3">Hey {account.username}! Let's start dancing!</Text>
            <STabList>
              <STab>Create Session</STab>
              <STab onClick={getSession}>Join Session</STab>
            </STabList>
          </Flex>
          <STabPanels>
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
              <STabPanel>
                <Button
                  variant="default"
                  sx={{
                    mt: 2,
                    width: '300px',
                  }}
                  loading={joinState === 'LOADING'}
                  onClick={joinState === 'LOADING' ? () => {} : () => createSession(selectedDevice)}
                >
                  Create session
                </Button>
              </STabPanel>
              <STabPanel>
                <Text variant="lb.md" my="3" sx={{ textAlign: 'center' }}>Choose a session</Text>
                <Select
                  name="session"
                  defaultValue={sessions.length ? selectedSession : 0}
                  onChange={(e) => {
                    // ls.set('session', e.target.value);
                    console.log(e.target.value);
                    setSession(e.target.value);
                  }}
                  sx={{
                    width: '300px'
                  }}
                >
                  {sessions.map((session) => (
                    <option value={session.sid}>Session {session.sid}</option>
                  ))}
                  {!sessions.length && (
                    <option value={0}>No sessions available</option>
                  )}
                </Select>
                <Button
                  variant="default"
                  sx={{
                    mt: 2,
                    width: '300px',
                  }}
                  loading={joinState === 'LOADING'}
                  disabled={!selectedSession}
                  onClick={joinState === 'LOADING' ? () => {} : () => joinedSession(selectedDevice, selectedSession)}
                >
                  Join session
                </Button>
              </STabPanel>
            </Flex>
          </STabPanels>
        </STabs>
      )}
    </Box>
  )
});

export default Home;