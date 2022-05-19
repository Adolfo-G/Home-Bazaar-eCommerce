import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {

  return (
    <div className="container my-1">
      <h2>Login</h2>
      <form>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email</label>
          <input
            placeholder="email"
            name="email"
            type="email"
            id="email"
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
          />
        </div>
        
      <Link to="/signup">Signup</Link>
      </form>
    </div>
  );
}

export default Login;
