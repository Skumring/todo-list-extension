import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { MemoryRouter as Router } from 'react-router-dom'

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'

// Components
import Root from './components/shared/Root'

// Stores
import RootStore from './stores/Root'

export default class App extends Component {
  render() {
    return (
      <Provider rootStore={new RootStore()}>
        <Router>
          <Root />
        </Router>
      </Provider>
    )
  }
}
