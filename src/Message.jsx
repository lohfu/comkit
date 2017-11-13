import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Message = (props) => (
  <div className={classNames(props.type, 'message', 'wrapper')}>
    <div className='container'>
      {props.heading && <div className='heading'>{props.heading}</div>}
      {props.body && <div className='body'>{props.body}</div>}
    </div>
  </div>
)

Message.propTypes = {
  heading: PropTypes.string,
  body: PropTypes.string,
  type: PropTypes.string,
}

export default Message
