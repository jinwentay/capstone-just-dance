import React from 'react';
import { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import { Text, Button } from "theme-ui";
import Input from './input';
import axios from 'axios';
import { connect } from 'react-redux';

const CreateUser = ({ dispatch }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  function onSubmit(data) {
    axios
      .post('http://localhost:5000/post/user', data)
      .then((res) => {
        alert(res.data.message);
        dispatch({
          type: 'LOGIN',
          payload: res.data.account
        });
        console.log(res.data.account);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div style={{ margin: '0 20px'}}>
      <Text variant="hd.sm" mb="2" sx={{ textAlign: 'center' }}>Create new user</Text>
      <form style={{ fontFamily: 'Quicksand' }} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              error="Username already exists. Choose a different one or login to your existing account."
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
              error="Password is required."
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
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(
  mapDispatchToProps
)(CreateUser);