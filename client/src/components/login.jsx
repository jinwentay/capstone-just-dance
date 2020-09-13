import React, { useState, useEffect } from 'react';
import { Flex, Label, Text, Button } from 'theme-ui';
import axios from 'axios';
import CreateUser from './create-user.component';
import Input from './input';
import { useForm } from 'react-hook-form';

const Login = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    axios.get("/get/user", {
      params: {
        username: data.username,
        password: data.password
      }
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    const checkConnection = async () => {
      const res = await axios.get("/hello");
      console.log(res);
    }
    checkConnection();
  }, []);
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        p: '16px',
      }}
    >
      <Text variant="hd.md" color="primary">JustDance!</Text>
      {hasAccount ? (
        <>
          <form style={{ fontFamily: 'Quicksand' }} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              error="Username does not exist. Have you created an account yet?"
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
              error="Password does not match. Have you created an account yet?"
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
              Submit
            </Button>
          </form>
          <Text variant="pg.sm" onClick={() => setHasAccount(false)}>New to us? Sign up now</Text>
        </>
      ) : (
        <>
          <CreateUser/>
          <Text variant="pg.sm" onClick={() => setHasAccount(true)}>New to us? Sign up now</Text>
        </>
      )}
    </Flex>
  )
};

export default Login;