import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form>
        <label htmlFor="firstName">First Name:</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
          />
        </div>
        <label htmlFor="lastName">Last Name:</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
          />
        </div>
        <label htmlFor="email">Email:</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
          />
        </div>
        <label htmlFor="pwd">Password:</label>
        <div className="flex-row space-between my-2">
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
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
