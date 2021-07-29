import React from 'react'
import styled from 'styled-components';
import { NavLink as Link} from 'react-router-dom';
const Navbar = () => {
    return (
        <div>
            <Nav>
                <NavLinks>
                    <NavLink to="/search">Search</NavLink>
                    <NavLink to="/history">History</NavLink>
                </NavLinks>
            </Nav>
        </div>
    )
}


const Nav = styled.nav`
    display: flex;
    background: #e0e0e0;
    height: 80px;
    width: 100%;
    align-items: center;
`

const NavLinks = styled.ul`
  display: flex;
  

`
export const NavLink = styled(Link)`
text-decoration: none;
color: #000;
font-size: 1.2rem;
padding: 0px 35px;
`
export default Navbar;
