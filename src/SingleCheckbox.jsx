import React from 'react'
import classNames from 'classnames'

import FormField from './FormField'

export default class SingleCheckbox extends FormField {
  onBlur (e) {
    this.setState({
      focus: false,
      touched: true,
    })

    this.setValue(e.target.checked)
  }

  onChange (e) {
    e.preventDefault()

    if (document.activeElement !== e.target && !e.target.value) return

    this.setValue(e.target.checked)
  }

  getValue () {
    return this.state.value
  }

  render () {
    const { name, disabled, title } = this.props
    const state = this.state

    const classes = Object.assign({
      cell: true,
      'field-container': true,
      empty: !state.value,
      filled: state.value,
      focus: state.focus,
      invalid: state.error,
      touched: state.touched,
      valid: state.value && !state.error,
    })

    return (
      <div className={classNames(classes)}>
        <label className='checkbox'>
          <input
            name={name}
            checked={!!state.value}
            disabled={disabled}
            onChange={this.onChange}
            ref={(input) => { this.input = input }}
            type='checkbox'
          />
          <i />
          <span>{title}</span>
          {state.error && <label className='error'>{state.error}</label>}
          <label className='icon' />
        </label>
      </div>
    )
  }
}
