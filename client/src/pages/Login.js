import React from 'react';
import { Link } from 'react-router-dom';

function Login() {

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="email">Email</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="email"
            name="email"
            type="email"
            id="email"
          />
        </div>
        <label htmlFor="pwd">Password</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
          />
        </div>
        <button>Submit</button>
      </form>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
