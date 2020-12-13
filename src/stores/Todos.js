import axios from 'axios'
import { observable, action } from 'mobx'

// Constants
import { API_URL } from '../constants/Url'

export default class Todos {
  @observable todos
  
  constructor(rootStore) {
    this.authenticationStore = rootStore.authenticationStore
    this.errorsStore = rootStore.errorsStore
    this.todos = []
  }
  
  @action getTodos() {
    axios({
      method: 'GET',
      url: `${API_URL}/todos`,
      data: null,
      headers: this.authenticationStore.getAuthHeaders()
    }).then((response) => {
      if (response.status === 200) {
        this.todos = response.data.todos
      }
    }).catch((error) => {
      this.errorsStore.handleErrors(error.response.data.errors)
    })
  }
  
  @action create(params) {
    axios({
      method: 'POST',
      url: `${API_URL}/todos`,
      data: { todo: params },
      headers: this.authenticationStore.getAuthHeaders()
    }).then((response) => {
      if (response.status === 201) {
        this.todos.splice(0, 0, response.data.todo)
      }
    }).catch((error) => {
      this.errorsStore.handleErrors(error.response.data.errors)
    })
  }
  
  @action update(e, id) {
    axios({
      method: 'PUT',
      url: `${API_URL}/todos/${id}`,
      data: { todo: { completed: e.target.checked }},
      headers: this.authenticationStore.getAuthHeaders()
    }).then((response) => {
      if (response.status === 200) {
        let todo = response.data.todo
        this.todos.splice(this.todos.findIndex(item => item.id === todo.id), 1, todo)
      }
    }).catch((error) => {
      this.errorsStore.handleErrors(error.response.data.errors)
    })
  }
  
  @action delete(id) {
    axios({
      method: 'DELETE',
      url: `${API_URL}/todos/${id}`,
      data: null,
      headers: this.authenticationStore.getAuthHeaders()
    }).then(response => {
      if (response.status === 204) {
        this.todos.splice(this.todos.findIndex(item => item.id === id), 1)
      }
    }).catch((error) => {
      this.errorsStore.handleErrors(error.response.data.errors)
    })
  }
}
