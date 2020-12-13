import React from 'react'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

// Authentication
import SignIn from '../authentication/SignIn'

// Resources

// Components
import Navigation from './Navigation'
import NotFound from './NotFound'
import Errors from './Errors'

@inject('rootStore')
@observer
class Root extends React.Component {
  static propTypes = {
    rootStore: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props)
    this.authenticationStore = this.props.rootStore.authenticationStore
    this.props.rootStore.errorsStore.handlerRef = React.createRef()
  }
  
  componentDidMount() {
    this.checkAccessToken()
  }
  
  componentDidUpdate() {
    this.checkAccessToken()
  }
  
  checkAccessToken() {
    let location = this.props.location.pathname
    
    this.authenticationStore.getAccessToken().then(() => {
      if (!this.authenticationStore.accessToken && location !== '/sign_in') {
        this.props.history.push({ pathname: '/sign_in' })
      } else if (this.authenticationStore.accessToken && location === '/sign_in') {
        this.props.history.push({ pathname: '/' })
      }
    })
  }
 
  signOut() {
    this.authenticationStore.signOut()
  }
 
  render() {
    /* Should initialize accessToken here for adding this object to @observer */
    const { accessToken } = this.authenticationStore
    
    return (
      <div className='h-100' ref={this.props.rootStore.errorsStore.handlerRef}>
        <Navigation
          signOut={this.signOut.bind(this)}
          accessToken={accessToken}
        />
        <Errors />
        <Switch>
          <Route path='/share' />
          <Route path='/sign_in' component={SignIn} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Root)
