import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Navbar, 
  Card, 
  DancePosition, 
  STabs, STabList, STab, STabPanels, STabPanel, 
  Button, 
  DanceMove,
  AccuracyGraph,
  BubbleGraph,
} from '../components';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';
import socketStore from '../store/store';
import { Grid, Box, Flex, Text, Select, Spinner } from 'theme-ui';
import PercentageCard from '../components/percentageCard';
import useSound from 'use-sound';
import login from './sounds/login.wav';

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
    sessionState,
    accuracy,
    totalPositions,
    isLoggingOut,
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
  const [isSmall, setSmall] = useState((window.innerWidth < 800 && window.innerWidth > 600) ? true : false);
  useEffect(() => {
    window.addEventListener("resize", (evt) => {
      if (window.innerWidth < 600) {
        setSmall(true)
      } else {
        setSmall(false);
      }
    })
  }, [])
  const [play] = useSound(login);
  return (
    <Box sx={{ 
      backgroundColor: 'white',
      overflow: 'scroll' 
    }}>
      <Navbar/>
      {startSession ? (
        <>
          <Grid
            sx={{
              my: 3,
              mx: 'auto',
              px: 3,
              height: 'calc(100vh - 100px)',
              gridTemplateColumns: ['1fr','50% 50%'],
              gridTemplateRows: ['repeat(4, minmax(250px,auto))','250px 1fr'],
              maxWidth: '1500px',
            }}
          >
            <Card title='DANCE POSITIONS' children={<DancePosition socketStore={socketStore}/>}/>
            <Card title='MOVE PREDICTION' children={<DanceMove socketStore={socketStore}/>}/>
            <Grid
              sx={{
                gridTemplateColumns: isSmall ? '1fr' : '1fr 250px',
                gap: '0px',
              }}
            >
              <Card title='ACCURACY' children={<AccuracyGraph accuracy={accuracy} totalPositions={totalPositions}/>} isSmall={isSmall}/>
              {!isSmall && (<Card title='' children={<PercentageCard accuracy={accuracy} totalPositions={totalPositions}/>}/>)}
            </Grid>
            <Card title='TIME DELAY' children={<BubbleGraph />}/>
          </Grid>
          {isLoggingOut && (
            <Flex
              sx={{
                minWidth: '100vw',
                minHeight: '100vh',
                background: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: '0px',
                top: '0px',
                zIndex: 3,
              }}
            >
              <Flex 
                sx={{ 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div 
                  style={{ 
                    width:'100%',
                    height: 0,
                    paddingBottom: '100%',
                    position: 'relative'
                  }}
                >
                  <iframe src="https://giphy.com/embed/5xtDarIHieSzSJdmn0A" width="100%" height="100%" style={{ position: 'absolute'}} frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                </div>
                <Text variant="dp.lg" mt="3" color="white">Good bye!</Text>
              </Flex>
            </Flex>
          )}
        </>
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
                  onClick={joinState === 'LOADING' ? () => {} : () => { play(); createSession(selectedDevice)}}
                >
                  Create session
                </Button>
              </STabPanel>
              <STabPanel>
                <Text variant="lb.md" my="3" sx={{ textAlign: 'center' }}>Choose a session</Text>
                {sessionState === 'LOADING' ? (
                  <Flex 
                    sx={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Spinner />
                    <Text variant="pg.lg">Loading sessions available</Text>
                  </Flex>
                ) : (
                  <>
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
                      disabled={!sessions.length || !selectedSession}
                      onClick={joinState === 'LOADING' ? () => {} : () => { play(); joinedSession(selectedDevice, selectedSession)}}
                    >
                      Join session
                    </Button>
                    {/* <Button onClick={play}>PLAY</Button> */}
                  </>
                )}
              </STabPanel>
            </Flex>
          </STabPanels>
        </STabs>
      )}
    </Box>
  )
});

export default Home;