// Stores
import ErrorsStore from './Errors'
import AuthenticationStore from './Authentication'

export default class RootStore {
  constructor() {
    this.errorsStore = new ErrorsStore(this)
    this.authenticationStore = new AuthenticationStore(this)
  }
}
