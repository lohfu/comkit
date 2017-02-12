import React, { PropTypes } from 'react';

import { omit } from 'lowline';

import FormElement from './FormElement';

const CheckBox = (props, context) => {
    console.log(context);
  let { onChange, idAttribute, name, value } = context.group;

  if (idAttribute && value) {
    value = value.map((item) => item[idAttribute]);
  }

  return (
    <label className="checkbox">
      <input type="checkbox" name={name} checked={value && value.includes(props.value)} value={props.value} onChange={onChange} /><i></i><span>{props.title}</span>
    </label>
  );
};

CheckBox.contextTypes = {
  group: React.PropTypes.object,
};

export default CheckBox;
