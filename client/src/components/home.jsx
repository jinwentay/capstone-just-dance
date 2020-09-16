import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './navbar';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';

const Home = observer(() => {
  const history = useHistory();
  const { account } = dashboardStore;
  useEffect(() => {
    console.log(account);
    if (account.id === -1) {
      history.push('/login');
    }
  }, [account, history])
  return (
    <Navbar/>
  )
});

export default Home;