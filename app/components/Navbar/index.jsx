import React from 'react';

const Navbar = () => (
  <nav className="navbar bg-danger shadow p-3 mb-5 d-flex justify-content-start">
    <img className="pl-4" src="https://i.imgur.com/ywp2w0e.png" alt="logo" height="70" />
    <p className="h2 text-light pl-4">YouTube Random Comment Picker</p>
    <a className="h6 text-light pl-3" href="https://github.com/nicola24" target="_blank" rel="noopener noreferrer">by Nicolas Peyrichou, Copyright © 2018</a>
  </nav>
);

export default Navbar;
