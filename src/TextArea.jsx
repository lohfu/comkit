import React, { PropTypes } from 'react';

import { omit } from 'lowline';

import FormElement from './FormElement';

export default class TextArea extends FormElement {
  onFocus(e) {
    this.setState({
      focus: true,
      touched: true,
    });

    // TODO still needed?
    if (document.documentElement.dataset.browser === 'IE11') {
      // make text area behave like input in IE (input fires both
      // focus and input when focusing input elements, but not textareas)
      this.setValue(e.target.value);
    }
  }

  render() {
    const { disabled, name, placeholder } = this.props;
    const state = this.state;

    const classes = {
      'field-container': true,
      cell: true,
      empty: !state.value,
      filled: !!state.value,
      dirty: state.dirty,
      focus: state.focus,
      invalid: !!state.error,
      touched: state.touched,
      valid: !state.error,
    };

    return (
      <div class={classes}>
        <label className="placeholder">{placeholder}</label>
        <textarea
          name={name}
          disabled={disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          placeholder={placeholder}
          ref={(input) => (this.input = input)}
          value={state.value}
        />
        <label class="icon" />
        {state.error && <label class="error">{state.error}</label>}
      </div>
    );
  }
}
