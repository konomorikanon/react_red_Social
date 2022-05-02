import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { obtenerPaginacionGet } from '../../actions/pagination'
import { publicacionesProfileGet, reiniciarValores } from '../../actions/publicaciones'
import CoverProfile from '../profiles/coverProfile'
import { MsgPub } from '../shared/msgPub'
import Publicaciones from '../shared/publicaciones'

var pag = 1;
const ProfileScreen = () => {

  const {publicacionesProfile, cargar, page, pagination, historyBack} = useSelector(state => state.publicaciones)
  const {user} = useSelector(state => state.user)

  const dispatch = useDispatch();

  const footer = useRef()
   

  useEffect(() => {

  
    if(cargar){

      dispatch(publicacionesProfileGet(5, page, pagination))      
    }

    console.log(publicacionesProfile, cargar);

    
  }, [publicacionesProfile, cargar])

  useEffect(() => {
    dispatch(reiniciarValores())

    dispatch(obtenerPaginacionGet())
    return () => {
      dispatch(reiniciarValores())
    }
    
  }, [])
  

  
  
  
  return (
    <div className="row n-g principal">
        <CoverProfile/>
        {/* codigo pub */}


        <div className="row g-0 px-2"> 
          <div className="col-md-3">

          </div>

          <div className="col-md-6">

            <MsgPub/>
            
            {( publicacionesProfile.length > 0 && !historyBack) && 
            <Publicaciones
              api={publicacionesProfile}
              user={user}

          />}
          </div>
        </div>
        <footer className="col-12 intersection text-center" ref={footer} id="">
          
        </footer>



    </div>
  )
}

ProfileScreen.propTypes = {}

export default ProfileScreen