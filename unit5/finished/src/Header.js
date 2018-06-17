import React from 'react'
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { tokens } from './config.js';

const Header = (props) => {
  const { activeToken, onTokenChanged } = props;

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="">DimDEX</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavDropdown eventKey={1} title={activeToken} id="dd-token-dropdown">
            {tokens.map((token, i) => 
              <MenuItem 
                key={i}
                onSelect={(token) => onTokenChanged(token)}
                eventKey={token}>{token}</MenuItem>)
            }
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
