import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useParams } from 'react-router-dom'
import { obtenerPaginacionGet } from '../../actions/pagination'
import {  publicacionesProfileGetId, reiniciarValores } from '../../actions/publicaciones'
import { getUserId , removeOneUserAction } from '../../actions/usuarios'
import CoverProfile from '../profiles/coverProfile'
import { MsgPub } from '../shared/msgPub'
import Publicaciones from '../shared/publicaciones'

export const UserIdScreen = () => {

    const {id} = useParams()

    const {publicacionesProfile, cargar, page, pagination} = useSelector(state => state.publicaciones)
    const {userOnePub} = useSelector(state => state.users);


    const dispatch = useDispatch();

    const footer = useRef()
    useEffect(() => {
    
        if(cargar){
            dispatch(publicacionesProfileGetId(5, page, pagination, id))      
        }
        
    }, [publicacionesProfile, cargar])

    
    useEffect(() => {
      dispatch(reiniciarValores())
      


      dispatch(obtenerPaginacionGet())

      dispatch(getUserId(id))

      return () => {
        dispatch(reiniciarValores())
        dispatch(removeOneUserAction())
      }


        
  }, [])
   
    
  return (
    <div className="row n-g principal">
    
        <CoverProfile
            uid={id}
            otherUser={true}

        />

        <div className="row g-0 px-2"> 
          <div className="col-md-3">

          </div>

          <div className="col-md-6">

            <MsgPub/>
            
            {( publicacionesProfile.length > 0) && <Publicaciones
            api={publicacionesProfile}
            morePubs={"userFriend"}
            id={id}
            user={userOnePub}
          />}
          </div>
        </div>

        <footer className="col-12 intersection text-center" ref={footer} id="">
          
        </footer>
    </div>
  )
}
