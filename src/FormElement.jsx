import React, { PropTypes } from 'react';

import { bindAll } from 'lowline';

class FormElement extends React.Component {
  constructor(props = {}, ...args) {
    super(props, ...args);

    bindAll(this, ['reset', 'validate', 'onChange', 'onBlur', 'onFocus']);

    this.name = props.name;

    this.state = {
      dirty: false,
      value: props.value,
      error: this.validate(props.value),
    };
  }

  componentDidMount() {
    if (this.context && this.context.registerInput) {
      this.unregister = this.context.registerInput(this);
    }
  }

  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  onBlur(e) {
    this.setState({
      focus: false,
      touched: true,
    });

    this.setValue(e.target.value);
  }

  onChange(e) {
    e.preventDefault();

    if (document.activeElement !== e.target && !e.target.value) return;

    this.setValue(e.target.value);
  }

  onFocus() {
    this.setState({
      focus: true,
    });
  }

  focus() {
    this.input.focus();
  }

  touch() {
    this.setState({
      touched: true,
    });
  }

  untouch() {
    this.setState({
      touched: false,
    });
  }

  isValid(validate) {
    let error;

    if (validate) {
      error = this.validate(this.state.value);

      this.setState({
        error,
      });
    } else {
      error = this.state.error;
    }

    return !error;
  }

  isDirty() {
    return this.state.dirty;
  }

  isTouched() {
    return this.state.touched;
  }

  getValue() {
    return this.state.value;
  }

  setValue(value, reset = false, silent = false) {
    if (value === '') {
      value = null;
    }

    this.setState({
      dirty: value !== this.props.value,
      error: !reset ? this.validate(value) : undefined,
      touched: !reset,
      value,
    });

    if (!silent && this.context.onChange && value !== this.state.value) {
      this.context.onChange();
    }
  }

  validate(value = this.state && this.state.value) {
    const { required, tests = [] } = this.props;

    if (required) {
      if (value == null || value === '') {
        // return Required error if no value is set
        // will fall through otherwise
        return typeof required === 'string' ? required : 'Required';
      }
    } else if (value == null || value === '') {
      // return undefined if not required and value not set
      return undefined;
    }

    for (let i = 0; i < tests.length; i += 1) {
      const [fnc, msg = 'Error'] = tests[i];

      if (!fnc(value)) return msg;
    }

    return undefined;
  }

  reset(silent = false) {
    this.setValue(this.props.value, true, silent);
  }
}

FormElement.contextTypes = {
  registerInput: PropTypes.func,
  onChange: PropTypes.func,
};

export default FormElement;
