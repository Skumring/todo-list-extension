// Stores
import ErrorsStore from './Errors'
import AuthenticationStore from './Authentication'
import TodosStore from './Todos'

export default class RootStore {
  constructor() {
    this.errorsStore = new ErrorsStore(this)
    this.authenticationStore = new AuthenticationStore(this)
    this.todosStore = new TodosStore(this)
  }
}
