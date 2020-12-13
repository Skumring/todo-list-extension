import React from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Col, Form, Button } from 'react-bootstrap'

@inject('rootStore')
@observer
class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.store = this.props.rootStore.authenticationStore
  }
  
  handleSubmit() {
    this.store.signUp(this.refs.email.value, this.refs.name.value, this.refs.password.value, this.refs.passwordConfirmation.value)
  }
  
  handleSignInSubmit() {
    this.props.history.push({ pathname: '/sign_in' })
  }
  
  render() {
    return (
      <Container className='d-flex h-100 justify-content-center align-content-center'>
        <Col md={6}>
          <Form className='mt-5' onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control id='email' type='email' ref='email' placeholder='Enter email' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control id='name' type='text' ref='name' placeholder='Enter name' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control id='password' type='password' ref='password' placeholder='Password' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control id='passwordConfirmation' type='password' ref='passwordConfirmation' placeholder='Password Confirmation' />
            </Form.Group>
            <Form.Row>
              <Button variant='primary' type='button' onClick={this.handleSubmit.bind(this)}>
                Sign Up
              </Button>
            </Form.Row>
            <Form.Row className='mt-3'>
              <Button variant='secondary' type='button' onClick={this.handleSignInSubmit.bind(this)}>
                Sign In
              </Button>
            </Form.Row>
          </Form>
        </Col>
      </Container>
    )
  }
}

export default SignUp
