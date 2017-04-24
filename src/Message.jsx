import React from 'react';

import classNames from 'classnames';

export default (props) => (
  <div className={classNames(props.type, 'message', 'wrapper')}>
    <div className="container">
      {props.heading && <div className="heading">{props.heading}</div>}
      {props.body && <div className="body">{props.body}</div>}
    </div>
  </div>
);
