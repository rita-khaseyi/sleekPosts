
import React, { useState } from 'react';
import Link from 'next/link';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        
        Sleek Posts
        
      </div>
      <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link href="/feed">
          Feed
        </Link>
        <Link href="/profile">
          Profile
        </Link>
        <Link href="/recommended">
         For you
        </Link>
        <Link href="/following">
          People
        </Link>
        <Link href="/logout">
          Logout
        </Link>
    
      </div>
      <div className="mobile-menu-icon" onClick={handleMobileMenuToggle}>
        <div className={`bar ${isMobileMenuOpen ? 'bar1-cross' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'bar2-cross' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'bar3-cross' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
