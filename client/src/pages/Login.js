import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      window.location.pathname('/')
    } catch (e) {
      console.log(e);
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
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="pwd">Password</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
      </form>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
