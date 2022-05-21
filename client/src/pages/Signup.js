import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
function Signup() {
  const [formState, setFormState] = useState({ 
    username:'', 
    email: '', 
    password: '' 
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      window.location.pathname('/')
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">User name:</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="user name"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="email">Email:</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="pwd">Password:</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
