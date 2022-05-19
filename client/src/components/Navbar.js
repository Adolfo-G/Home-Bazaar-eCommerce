import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth'

function Navbar() {
    function showNavLoginStatus() {
        if (Auth.loggedIn()) {
            return (
                <ul>
                    <li>
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li>
                        <Link to="/">
                            Login
                        </Link>
                    </li>
                </ul>
            )
        }
    }
    return (
        <header>
          <h1>
            <Link to="/">
              Yard Sale
            </Link>
          </h1>
    
          <nav>
            {showNavLoginStatus()}
          </nav>
        </header>
      );
}

export default Navbar;