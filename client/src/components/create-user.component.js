import React from 'react';
import { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const CreateUser = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  function submit(data) {
    axios.post('http://localhost:5000/users/add', data)
      .then(res => console.log(res.data))
  }
  return (
    <div style={{ margin: '0 20px'}}>
      <h3>Create new user</h3>
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-group">
          <label>Username: </label>
          <input
            name="username"
            type="text"
            ref={register({ require: true })}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-primary"/>
        </div>
      </form>
    </div>
  )
}

export default CreateUser;