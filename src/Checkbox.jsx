import React from 'react'
import PropTypes from 'prop-types'

class Checkbox extends React.Component {
  componentWillMount () {
    if (!(this.context && this.context.checkboxGroup)) {
      throw new Error('The `Checkbox` component must be used as a child of `CheckboxGroup`.')
    }
  }

  render () {
    console.log('render check box')
    let { onChange, idAttribute, name, value } = this.context.checkboxGroup

    if (idAttribute && value) {
      value = value.map((item) => item[idAttribute])
    }

    const checked = !!value && value.includes(this.props.value)
    console.log(`${this.props.value}: ${checked}`)

    return (
      <label className='checkbox'>
        <input
          type='checkbox'
          name={name}
          checked={checked}
          value={this.props.value}
          onChange={onChange}
        /><i /><span>{this.props.title}</span>
      </label>
    )
  }
}

Checkbox.propTypes = {
  value: PropTypes.any,
  title: PropTypes.string
}

Checkbox.contextTypes = {
  checkboxGroup: PropTypes.object
}

export default Checkbox
