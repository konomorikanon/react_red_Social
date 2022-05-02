import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetearSolicitudes } from '../../actions/solicitud'
import { obtenerListadoAmigos } from '../../actions/usuarios'
import { Friend } from './Friend'

export const FriendList = () => {
  const [friends , setfriends] = useState([])
  const dispatch = useDispatch();
  const {usuarios, obtener } = useSelector(state => state.users)
  const {uid } = useSelector(state => state.user.user)


  useEffect(() => {

    if (obtener) {
        dispatch(obtenerListadoAmigos())
      
    }
    setfriends(usuarios)

    return () => {
      dispatch(resetearSolicitudes())

    }

   
  }, [usuarios])
  

  return (
    <div className='my-2'>
        {
            friends.map( user => (

                (user.uid !== uid) &&
                <Friend
                
                    key={user.uid}
                    user={user}
                    uid={uid}
                    
                />
            ))
        }

    </div>
  )
}
