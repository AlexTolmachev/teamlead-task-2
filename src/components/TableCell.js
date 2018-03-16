import React, { Component } from 'react'
import { Input, Icon } from 'antd'

export default class TableCell extends Component {
  state = {
    value: this.props.value,
    editable: false
  }

  changeHandler = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  check = () => {
    this.setState({
      editable: false
    })

    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }

  edit = () => {
    this.setState({
      editable: true
    })
  }

  render() {
    const { editable, value = ' ' } = this.state

    return (
      <div className='TableCell'>
        {
          editable ?
          <div className='TableCell_inputWrapper'>
            <Input
              value={value}
              onChange={this.changeHandler}
              onPressEnter={this.check}
            />
            <Icon
              type='check'
              className='TableCell_icon-check'
              onClick={this.check}
            />
          </div> :
          <div className='TableCell_inputWrapper'>
            {value}
            <Icon
              type='edit'
              className='TableCell_icon-edit'
              onClick={this.edit}
            />
          </div>
        }
      </div>
    )
  }
}