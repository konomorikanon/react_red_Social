import React from 'react'
import { FriendList } from '../friends/FriendList'
import MigaPan from '../friends/MigaPan'
import Sidebar from '../shared/Sidebar'
// import PropTypes from 'prop-types'

const FriendsScreen = props => {
  return (
    <div>
        <div className="row n-g principal">
            <div className="col-md-3 d-none d-md-block  ">
              <Sidebar/>
            </div>
            <div className="col-md-9">
                <MigaPan
                  title={'ver lista de amigos'}
                />

                <FriendList/>
            </div>
            
        </div>
        
          
        
    </div>
  )
}

// FriendsScreen.propTypes = {}

export default FriendsScreen