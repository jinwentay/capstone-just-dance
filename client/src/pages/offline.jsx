import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Navbar, 
  Card, 
  OverallAccuracyGraph,
  Table, Column, Row, Header
} from '../components';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';
import offlineStore from '../store/offlineStore';
import { Grid, Box, Flex, Text } from 'theme-ui';
import Report from '../components/report';

const Offline = observer(() => {
  const history = useHistory();
  const { account } = dashboardStore;
  const { getAllSessionAccuracy, getAllSessionTotalPositions, totalPositions, accuracyData, getUserSessions, sessions } = offlineStore;
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    console.log(account);
    if (account.id === -1) {
      history.push('/login');
    }
  }, [account, history]);

  useEffect(() => {
    getAllSessionAccuracy();
    getAllSessionTotalPositions();
    getUserSessions();
    console.log(totalPositions, accuracyData);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box sx={{ 
        backgroundColor: 'white',
        minHeight: '100vh',
        width: '100vw',
        zIndex: -1,
        position: isOpen ? 'fixed' : 'absolute',
        top: '0px',
        left: '0px'
      }}>
        <Navbar/>
        <Flex 
          sx={{ 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexDirection: 'column', 
            mb: 3, 
            overflow: isOpen ? 'hidden' : 'scroll',
            backgroundColor: 'white' 
          }}
          >
          <Text variant="hd.lg" mb="3">How's your dance progress so far?</Text>
          <Grid 
            sx={{
              m: 3,
              gridTemplateColumns: ['1fr', '800px']
            }}
          >
            <Card title='ACCURACY ANALYTICS' children={<OverallAccuracyGraph/>}/>
            <Text variant="pg.md" onClick={() => setOpen(true)}>View session report</Text>
            <Table>
              <tbody>
                <Row>
                  <Header>Session</Header>
                  <Header>Date</Header>
                  {/* <Header>Participants</Header> */}
                  <Header>Duration</Header>
                </Row>
                {sessions.map((session) => (
                    <Row>
                      <Column>{session.sid}</Column>
                      <Column>{session.date}</Column>
                      <Column>
                        {session.duration.hours ? `${session.duration.hours} hr ` : ''}
                        {session.duration.minutes} min {session.duration.seconds} s
                      </Column>
                    </Row>
                ))}
              </tbody>
            </Table>
          </Grid>
        </Flex>
        {isOpen && (
          <Report close={() => setOpen(false)}/>
        )}
      </Box>
    </Box>
  )
});

export default Offline;