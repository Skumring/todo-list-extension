import React from 'react'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Overlay, Button, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'

@inject('rootStore')
@observer
class Errors extends React.Component {
  static propTypes = {
    rootStore: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props)
    this.store = this.props.rootStore.errorsStore
  }
  
  @computed get showState() {
    return this.store.errors.length > 0
  }
  
  render() {
    return (
      <React.Fragment>
        <Overlay
          placement='auto'
          show={this.showState}
          target={this.store.handlerRef.current}
          onEntering={(e) => (
            e.children[1].style.backgroundColor = '#da2a2a',
            e.children[1].style.maxWidth = '600px'
          )}
        >
          <Tooltip className='mt-2'>
            <Button variant='link' className='position-absolute' style={{ top: '0px', right: '0px' }} onClick={() => this.store.clearErrors()}>X</Button>
            <h4 className='mt-2 ml-4 mr-4'>Errors occurred:</h4>
            {this.store.errors.map((error, index) => (
              <div key={index}>{error}...</div>
            ))}
          </Tooltip>
        </Overlay>
      </React.Fragment>
    )
  }
}

export default Errors
