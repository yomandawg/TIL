import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = ({ className }) => {
  return (
    <nav className={className}>
      <Link to="/" className="nav__link">
        Home
      </Link>
      <Link to="/posts" className="nav__link">
        Posts
      </Link>
    </nav>
  );
};

export default styled(Navbar).attrs({
  navWidth: '200px',
})`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => props.navWidth};
  height: 100vh;
  background: #222222;
  font-size: 18px;

  .nav__link {
    display: block;
    padding: 12px 18px;
    text-decoration: none;
    color: #eeeeee;
    font-weight: 500;
  }

  .nav__link:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;
