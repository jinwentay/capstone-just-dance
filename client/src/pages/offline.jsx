import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Navbar, 
  Card, 
  OverallAccuracyGraph,
  DataTable,
} from '../components';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';
import offlineStore from '../store/offlineStore';
import { Grid, Box, Flex, Text } from 'theme-ui';
import Report from '../components/report';

const Offline = observer(() => {
  const history = useHistory();
  const { account } = dashboardStore;
  const { getAllSessionAccuracy, getAllSessionTotalPositions, totalPositions, accuracyData, getUserSessions, sessions, getSessionMoves, getSessionPositions } = offlineStore;
  const [isOpen, setOpen] = useState(false);
  const [sid, setSid] = useState(null);
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
            <Text variant="hd.md" sx={{ textAlign: 'center' }}>Select a session to view your dance analytics!</Text>
            <DataTable 
              headers={['Session', 'Date', 'Duration']} 
              rowItems={sessions} 
              rowFunc={(session) => { 
                setSid(session.sid);
                setOpen(true); 
              }}
            />
          </Grid>
        </Flex>
        {isOpen && (
          <Report  
            close={() => { 
              setOpen(false);
              setSid(null);
            }} 
            sid={sid}
          />
        )}
      </Box>
    </Box>
  )
});

export default Offline;