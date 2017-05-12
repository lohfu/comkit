import React from 'react';

import Form from './Form';

export default class ClassifiedForm extends Form {
  constructor(...args) {
    super(...args);

    this.state = {
      dirty: false,
      valid: false,
    };
  }

  shouldComponentUpdate(props, state) {
    return props !== this.props
      || state.dirty !== this.state.dirty
      || state.valid !== this.state.valid;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.attributes !== this.props.attributes) {
      this.reset();
    }
  }

  onChange() {
    setTimeout(() => {
      this.setState({
        dirty: this.isDirty(),
        valid: this.isValid(),
      });
    });
  }

  reset() {
    super.reset();

    this.setState({
      valid: false,
      dirty: false,
    });
  }
}
