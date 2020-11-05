import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import { Text, Button } from "theme-ui";
import Input from '../components/UI/input';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';
import { useHistory } from 'react-router-dom';

const CreateUser = observer(() => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  function onSubmit(data) {
    dashboardStore.signup(data);
  }
  const { account } = dashboardStore;
  useEffect(() => {
    if (dashboardStore.account?.id !== -1) {
      history.push('/');
    }
  }, [account, history])
  return (
    <div style={{ margin: '0 20px'}}>
      <Text variant="hd.sm" mb="2" sx={{ textAlign: 'center' }}>Create new user</Text>
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
              Sign up
            </Button>
          </form>
    </div>
  )
});

export default CreateUser;