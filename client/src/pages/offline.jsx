import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Navbar, 
  Card, 
  OverallAccuracyGraph
} from '../components';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';
import offlineStore from '../store/offlineStore';
import { Grid, Box, Flex, Text } from 'theme-ui';

const Offline = observer(() => {
  const history = useHistory();
  const { account } = dashboardStore;
  const { getAllSessionAccuracy, getAllSessionTotalPositions, totalPositions, accuracyData } = offlineStore;
  useEffect(() => {
    console.log(account);
    if (account.id === -1) {
      history.push('/login');
    }
  }, [account, history]);

  useEffect(() => {
    getAllSessionAccuracy();
    getAllSessionTotalPositions();
    console.log(totalPositions, accuracyData);
  }, []);

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      overflow: 'scroll',
      height: '100vh'
    }}>
      <Navbar/>
      <Flex sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mb: 3 }}>
        <Text variant="hd.lg" mb="3">How's your dance progress so far?</Text>
        <Grid 
          sx={{
            m: 3,
            gridTemplateColumns: ['1fr', '800px']
          }}
        >
          <Card title='ACCURACY ANALYTICS' children={<OverallAccuracyGraph/>}/>
        </Grid>
      </Flex>
    </Box>
  )
});

export default Offline;