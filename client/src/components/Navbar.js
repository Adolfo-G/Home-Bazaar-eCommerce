import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth'

function Navbar() {
    function showNavLoginStatus() {
        if (Auth.loggedIn()) {
            return (
                <ul className="navLinks">
                    <li>
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navLinks">
                    <li>
                        <Link to="/"
                        className="link">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/"
                        className="link">
                            Login
                        </Link>
                    </li>
                </ul>
            )
        }
    }
    return (
        <header className="header">
          <h1>
            <Link to="/"
            className="pageName">
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