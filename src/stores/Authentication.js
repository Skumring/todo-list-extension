/* global chrome */
import axios from 'axios'
import { observable, action } from 'mobx'

// Constants
import { API_URL } from '../constants/Url'

export default class Authentication {
  @observable accessToken
  
  constructor(rootStore) {
    this.errorsStore = rootStore.errorsStore
    this.getAccessToken()
  }
  
  @action signIn(email, password) {
    let requestData = {
      user: {
        email: email,
        password: password
      }
    }
    
    axios({
      method: 'POST',
      url: `${API_URL}/sign_in`,
      data: requestData
    }).then((response) => {
      if (response.status === 200) {
        this.setAccessToken(response.headers['authorization'])
        this.setCurrentUser(response.data.user)
      }
    }).catch((error) => {
      this.errorsStore.handleErrors([error.response.data.error])
    })
  }
  
  @action signUp(email, name, password, passwordConfirmation) {
    let requestData = {
      user: {
        email: email,
        name: name,
        password: password,
        password_confirmation: passwordConfirmation
      }
    }
    
    axios({
      method: 'POST',
      url: `${API_URL}/sign_up`,
      data: requestData
    }).then((response) => {
      if (response.status === 201) {
        this.setAccessToken(response.headers['authorization'])
        this.setCurrentUser(response.data.user)
      }
    }).catch((error) => {
      this.errorsStore.handleErrors(error.response.data.errors)
    })
  }
  
  @action signOut() {
    axios({
      method: 'DELETE',
      url: `${API_URL}/sign_out`,
      headers: this.getAuthHeaders()
    }).then((response) => {
      this.removeSession()
    }).catch((error) => {
      this.removeSession()
      this.errorsStore.handleErrors([error.response.data.error])
    })
  }
  
  setAccessToken(accessToken) {
    this.accessToken = accessToken
    chrome.storage.local.set({ 'accessToken': accessToken })
  }
  
  setCurrentUser(currentUser) {
    this.currentUser = currentUser
    chrome.storage.local.set({ 'currentUser': currentUser })
  }
  
  getAccessToken() {
    return new Promise((resolve) => {
      chrome.storage.local.get('accessToken', (result) => {
        this.accessToken = result.accessToken
        resolve()
      })
    })
  }
  
  getCurrentUser() {
    return new Promise((resolve) => {
      chrome.storage.local.get('currentUser', (result) => {
        this.currentUser = result.currentUser
        resolve()
      })
    })
  }
  
  removeAccessToken() {
    chrome.storage.local.remove('accessToken')
    this.accessToken = null
  }
  
  removeCurrentUser() {
    chrome.storage.local.remove('currentUser')
    this.currentUser = null
  }
  
  removeSession() {
    this.removeAccessToken()
    this.removeCurrentUser()
  }
  
  getAuthHeaders() {
    return { 'Authorization': this.accessToken, 'Access-Control-Allow-Origin': '*' }
  }
}
