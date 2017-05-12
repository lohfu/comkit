import React, { PropTypes } from 'react';
import deepEqual from 'deep-equal';
import { set, merge, bindAll } from 'lowline';

class Form extends React.Component {
  constructor(...args) {
    super(...args);

    bindAll(this, ['reset', 'registerInput', 'onChange', 'onSubmit']);

    this.inputs = [];
  }

  getChildContext() {
    return {
      registerInput: this.registerInput,
      onChange: this.onChange,
    };
  }

  registerInput(component) {
    this.inputs.push(component);

    return () => {
      const index = this.inputs.indexOf(component);

      this.inputs.splice(index, 1);
    };
  }

  isDirty() {
    return this.inputs.some((input) => input.isDirty());
  }

  isValid() {
    return this.inputs.every((input) => input.isValid());
  }

  validate(focus = false, touch = false) {
    return this.inputs.reduce((result, input) => {
      const isValid = input.isValid(true);

      // focus first invalid element
      if (focus && result && !isValid) {
        input.focus();
      }

      // only touch invalid or filled elements when validating
      if (touch) {
        if (!isValid || input.getValue() != null) {
          input.touch();
        } else {
          input.untouch();
        }
      }

      return result && isValid;
    }, true);
  }

  toJSON() {
    return merge(this.props.attributes, this.inputs.reduce((json, input) => {
      const value = input.getValue();

      if (value != null) {
        set(json, input.name, value);
      }

      return json;
    }, {}));
  }

  reset() {
    this.inputs.forEach((input) => {
      input.reset(true);
    });
  }

  render() {
    const { children } = this.props;

    return (
      <form>{children}</form>
    );
  }
}

Form.childContextTypes = {
  registerInput: PropTypes.func,
  onChange: PropTypes.func,
};

export default Form;
