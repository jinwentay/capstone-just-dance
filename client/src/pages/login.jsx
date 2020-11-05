import React, { useState, useEffect } from 'react';
import { Flex, Text, Button } from 'theme-ui';
import axios from 'axios';
import CreateUser from './signup';
import Input from '../components/UI/input';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';

const Login = observer(() => {
  const history = useHistory();
  const { account } = dashboardStore;
  const [hasAccount, setHasAccount] = useState(true);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    dashboardStore.login(data);
  }

  useEffect(() => {
    const checkConnection = async () => {
      const res = await axios.get("/hello");
      console.log(res);
    }
    checkConnection();
    console.log(account)
  }, [account]);

  useEffect(() => {
    if (dashboardStore.account?.id !== -1) {
      history.push('/');
    }
  }, [account, history])
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        p: '16px',
      }}
    >
      <Text variant="hd.lg" color="primary" mb="2">JustDance!</Text>
      {hasAccount ? (
        <>
          <Text variant="hd.sm" mb="2" sx={{ textAlign: 'center' }}>Login</Text>
          <form style={{ fontFamily: 'Quicksand' }} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              type="text"
              name="username"
              ref={register({ required: true })}
              error={errors.username}
            />
            {errors.username && errors.username.type === 'required' && (
              <Text color="danger" variant="pg.xs">Username is required</Text>
            )}
            <Input
              label="Password"
              type="password"
              name="password"
              ref={register({ required: true })}
              error={errors.password}
            />
            {errors.password && errors.password.type === 'required' && (
              <Text color="danger" variant="pg.xs">Password is required</Text>
            )}
            <Button
              variant="default"
              sx={{
                mt: 2,
                width: '100%',
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </form>
          <Text 
            variant="pg.sm" 
            onClick={() => setHasAccount(false)}
            sx={{
              cursor: 'pointer',
              mt: 2
            }}
          >
            New to us? Sign up now
          </Text>
        </>
      ) : (
        <>
          <CreateUser/>
          <Text 
            variant="pg.sm" 
            onClick={() => setHasAccount(true)}
            sx={{
              cursor: 'pointer',
              mt: 2
            }}
          >
            New to us? Sign up now
          </Text>
        </>
      )}
    </Flex>
  )
});

export default Login;