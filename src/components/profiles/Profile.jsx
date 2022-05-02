import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Profile_modal from '../publications/Profile_modal';

const Profile = ({pub = {}, typePub, mostrarImage = false, otherUser }) => {

    const { image , description, uid} = pub
    const [show, setShow] = useState(false);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 

  
  return (
      <>
      
      { (Object.entries(pub).length > 0) &&  <div className='profile_profile'>
            <div className="img" style={{
                'background' :  `url( '${image}')`
            }}> 

                {!otherUser && <div className="profile_menu">
                    <button to="" className="nav-link text-dark" onClick={handleShow}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>

                    </button>
                </div>}
            </div>
            <Profile_modal
            
                handleClose={handleClose}
                show={show}
                title={'actualizar perfil'}
                typePub={typePub}
                moreOpt={{mostrarImage , image, description,uid }}
            
            />
            

        </div>}
      
      </>
    



  )
}

Profile.propTypes = {}

export default Profile