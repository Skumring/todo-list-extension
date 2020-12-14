import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Navigation extends React.Component {
  render() {
    const { accessToken, signOut } = this.props;
    
    let signInLink = (
      <LinkContainer to='/sign_in'>
        <Nav.Link>Sign In</Nav.Link>
      </LinkContainer>
    )
    
    let signOutLink = (
      <LinkContainer to='#sign_out'>
        <Nav.Link onClick={signOut}>Sign Out</Nav.Link>
      </LinkContainer>
    )
    
    return (
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand href='/'>TODO List Extension</Navbar.Brand>
        <Navbar.Toggle aria-controls='nav-links' />
        <Navbar.Collapse id='nav-links'>
          <Nav activeKey='/'>
            {!accessToken && signInLink}
            {accessToken && signOutLink}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
