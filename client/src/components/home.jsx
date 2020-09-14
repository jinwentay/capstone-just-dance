import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
const Home = ({ account }) => {
  const history = useHistory();
  useEffect(() => {
    if (account.id === -1) {
      history.push('/login');
    }
  }, [account])
  return (
    //nav bar
    <div></div>
  )
};

const mapStateToProps = state => {
  return { account: state.account }
};

export default connect(mapStateToProps)(Home);