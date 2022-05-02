import React from 'react'
import PropTypes from 'prop-types'
import { message } from '../../helpers/stylesFuncions'

const Alert = ({err, msg}) => {
  return (
    <div className={ message(err) } >
        {msg}
    </div>
  )
}

Alert.propTypes = {}

export default Alert