import { observable } from 'mobx'

export default class Errors {
  @observable errors
  @observable handlerRef
  
  constructor(rootStore) {
    this.errors = []
    this.handlerRef = {}
  }
  
  handleErrors(errors) {
    this.errors.push(...errors)
    this.timer = setInterval(() => { this.clearErrors() }, 10000)
  }
  
  clearErrors() {
    this.errors = []
    clearInterval(this.timer)
  }
}
