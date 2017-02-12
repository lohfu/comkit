import React, { PropTypes } from 'react';

import classNames from 'classnames';

import FormElement from './FormElement';

export default class SingleCheckBox extends FormElement {
  render() {
    const { type = 'text', name, disabled, title } = this.props;
    const state = this.state;

    const classes = Object.assign({
      cell: true,
      'field-container': true,
      empty: !state.value,
      filled: state.value,
      focus: state.focus,
      invalid: state.error,
      touched: state.touched,
      valid: state.value && !state.error,
    });

    return (
      <div className={classNames(classes)}>
        <label className="checkbox">
          <input
            name={name}
            disabled={disabled}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onInput={this.onChange}
            ref={(input) => { this.input = input; }}
            type="checkbox"
          />
          <i></i>
          <span>{title}</span>
          {state.error && <label className="error">{state.error}</label>}
          <label className="icon" />
        </label>
      </div>
    );
  }
}
