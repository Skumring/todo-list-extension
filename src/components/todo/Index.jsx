import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { CardColumns } from 'react-bootstrap'

@inject('rootStore')
@observer
class Index extends React.Component {
  static propTypes = {
    rootStore: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props)
    this.authenticationStore = this.props.rootStore.authenticationStore
    this.todosStore = this.props.rootStore.todosStore
  }
  
  componentDidMount() {
    this.authenticationStore.getAccessToken().then(() => {
      this.todosStore.getTodos()
    })
  }
  
  handleCreateTodo(e) {
    if (e.key === 'Enter' && !(this.refs.todoTitle.value === '')) {
      this.todosStore.create({ title: this.refs.todoTitle.value })
      this.refs.todoTitle.value = null
    }
  }
  
  render() {
    const { todosStore } = this.props.rootStore
    
    return (
      <CardColumns className='m-2'>
        <div className='inputContainer'>
          <input
            className='taskInput'
            type='text'
            placeholder='Add a task'
            maxLength='100'
            ref='todoTitle'
            onKeyPress={this.handleCreateTodo.bind(this)}
          />
        </div>
        <div className='listWrapper'>
          <ul className='taskList'>
            {todosStore.todos.map((todo) => (
              <li className='task' key={todo.id}>
                <input
                  className='taskCheckbox'
                  type='checkbox'
                  checked={todo.completed}
                  onChange={(e) => todosStore.update(e, todo.id)}
                />
                <label className='taskLabel'>{todo.title}</label>
                <span className='deleteTaskBtn'
                  onClick={(e) => todosStore.delete(todo.id)}>
                  x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardColumns>
    )
  }
}

export default Index
