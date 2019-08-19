import React from 'react';
import StyledHeader from './Header.style';

const Header = () => {
  return (
    <StyledHeader className="header">
      <section className="header__section">DashB</section>
      <section className="header__section right">
        <span>Link</span>
      </section>
    </StyledHeader>
  );
};

export default Header;
