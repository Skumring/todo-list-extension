import React from 'react'
import Container from 'react-bootstrap/Container'

export default class NotFound extends React.Component {
  render() {
    return (
      <Container className='d-flex h-100 justify-content-center align-content-center'>
        <h2 className='mt-5'>404 - Page not found...</h2>
      </Container>
    )
  }
}
