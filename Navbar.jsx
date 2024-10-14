import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* Add more navigation links as you create more pages */}
      </ul>
    </nav>
  );
}

export default Navbar;