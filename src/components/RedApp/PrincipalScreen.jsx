import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../shared/Sidebar'
import Publicaciones from '../shared/publicaciones'

const PrincipalScreen = props => {

  return (
    <div>
        <div className="">
          <div className="row n-g principal">
            <div className="col-md-3 d-none d-md-block  ">
              <Sidebar/>
            </div>
            <div className="col-md-6">
              <Publicaciones/>
            </div>

          </div>
          
        </div>
    </div>
  )
}

PrincipalScreen.propTypes = {}

export default PrincipalScreen