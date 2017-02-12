import React, { PropTypes } from 'react';

import classNames from 'classnames';

import { omit } from 'lowline';

import FormElement from './FormElement';

class CheckBoxGroup extends FormElement {
  constructor(props, ...args) {
    if (typeof props.values[0] === 'object' && !props.idAttribute) {
      throw new Error('Object arrays need idAttribute');
    }

    super(props, ...args);
  }

  onChange(e) {
    e.preventDefault();

    if (document.activeElement !== e.target) return;

    let groupValue = this.state.value || [];
    let inputValue = parseInt(e.target.value, 10) || e.target.value;

    if (e.target.checked) {
      if (this.props.idAttribute) {
        inputValue = this.props.values.find((item) => item[this.props.idAttribute] === inputValue);
      }

      groupValue = groupValue.concat(inputValue).sort(this.props.idAttribute ? (a, b) => {
        let sortAttribute = this.props.sortAttribute || this.props.idAttribute;
        let desc = false;

        if (sortAttribute.startsWith('-')) {
          sortAttribute = sortAttribute.slice(1);
          desc = true;
        }

        if (a[sortAttribute] < b[sortAttribute]) {
          return desc ? 1 : -1;
        }

        if (a[sortAttribute] > b[sortAttribute]) {
          return desc ? -1 : 1;
        }

        return 0;
      } : null);
    } else {
      groupValue = groupValue.filter((value) => {
        if (this.props.idAttribute) {
          return value[this.props.idAttribute] !== inputValue;
          // inputValue = this.props.values.find((item) => item[this.props.idAttribute] === inputValue);
        }

        return value !== inputValue;
      });
    }

    this.setValue(groupValue.length ? groupValue : undefined);
  }

  setValue(value) {
    if (value === '') {
      value = undefined;
    }

    this.setState({
      touched: true,
      dirty: value !== this.props.value,
      error: this.validate(value),
      value,
    });

    this.context.setAttribute(this.props.name, value);
  }

  getChildContext() {
    return {
      group: {
        value: this.state.value,
        idAttribute: this.props.idAttribute,
        name: this.props.name,
        onChange: this.onChange,
      },
    };
  }

  render() {
    const { type = 'text', disabled, children, placeholder, values, value, idProp, nameProp } = this.props;
    const state = this.state;

    const classes = Object.assign({
      'field-container': true,
      'checkbox-group': true,
      empty: !state.value,
      filled: state.value,
      invalid: state.error,
      touched: state.touched,
      valid: state.value && !state.error,
    });

    return (
      <div className={classNames(classes)}>
        {children}
        <label className="icon" />
        {state.error && <label className="error">{state.error}</label>}
      </div>
    );
  }
}

CheckBoxGroup.childContextTypes = {
  group: React.PropTypes.object,
};

export default CheckBoxGroup;
