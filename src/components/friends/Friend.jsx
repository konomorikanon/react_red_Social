import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { aceptarSolicitud, eliminarPeticionSolicitud, obtenerSolicitudPubID, obtenerSolicitudTercerasPersonas, setSolicitudPub, setSolicitudPubPost } from '../../actions/solicitud'
import { BtnSolicitud } from '../solicitud/btnSolicitud'

export const Friend = ({user  }) => {

  const {usuarios, solicitudUser } = useSelector(state => state.users)
  const dispatch = useDispatch();

  const [solicitud, setSolicitud] = useState({})
  const [condition, setcondition] = useState(false)
  const [obtenerPrimeraVez, setobtenerPrimeraVez] = useState(true)

  const handleClickSolicitud = () => {
   
    // vamos a verificar si la solicitud tiene un id o si no para crear una nueva

    console.log("desde solicitud");
    if(solicitud._id){
      // 
      const url = `/solicitud/sendSolicitud/${solicitud._id}`;
     
      dispatch(setSolicitudPub(url , solicitudUser, user.uid, 'SOLICITUD' ))

    }else{
      const url = `/solicitud/sendSolicitud`;
      dispatch(setSolicitudPubPost(url , solicitudUser, user.uid, 'SOLICITUD', true ))


    }


  }

  const handleClickAcceptSoli = () => {
    dispatch(aceptarSolicitud(solicitud._id, solicitudUser))
    

  }

  const handleClickRechazarSoli = () => {
    dispatch(eliminarPeticionSolicitud(solicitud._id, solicitudUser))
    

  }

  const handleClickRemoveSolicitud = () => {
    console.log(user,  solicitud, usuarios);
    
    const url = `/solicitud/removeSolicitud/${solicitud._id}` 

    dispatch(setSolicitudPub(url , solicitudUser , user.uid, 'SOLICITUD_REMOVE'))

  }

  const obtenerSolicitud  = () => {

    const value = solicitudUser.find(solicitud => solicitud.idFriend === user.uid )

    console.log(value, solicitudUser);
    if (value) {
        setSolicitud(value) 
        setcondition(true)            
    }else{
      const value = solicitudUser.find(solicitud => solicitud.idUser === user.uid )
      
      if(value){
        setSolicitud({
          ...value,
          solicitudMode : true
        } ) 
        setcondition(true) 
      }


    }

}
  useEffect(() => {

    if(obtenerPrimeraVez){
        // verificar si existe una solicitud del la persona
        const url = `/solicitud/friend/${user.uid}`
        dispatch(obtenerSolicitudTercerasPersonas(url ))



        dispatch(obtenerSolicitudPubID(user.uid))
        // dispatch(obtenerCantidadReactionPub(publicacion.uid))

    }

    console.log("desde publicaciones");

    
  }, [])

  useEffect(() => {
    setcondition(false)
    
  }, [solicitudUser])
  
  

  return (

    <>
        {
            (usuarios.length  && !condition) && obtenerSolicitud()
        }
     <div className='friends_friend  '>
          <div className="col-4 col-sm-3 col-md-2 col-xl-1">
            {
              (user.profile) ?
                <img src={user.profile} alt="" /> 
                :
                <img src={`assets/persona1.jpg`} alt="" />

            }

                </div>
            <div className="col-8 col-sm-3 col-md-10 col-xl-11">
                <Link to={`/user/${user.uid}`}  className="nav-link text-dark p-0"> <h4>{user.name} </h4></Link> 
                <p className='m-0 pb-1'><small>16 amigos en comun </small> </p>
               <BtnSolicitud
                  solicitud={solicitud}
                  handleClickSolicitud={handleClickSolicitud}
                  handleClickRemoveSolicitud={handleClickRemoveSolicitud}
                  handleClickAcceptSoli={handleClickAcceptSoli}
                  handleClickRechazarSoli={handleClickRechazarSoli}
               />

            </div>
    </div>
    </>
   
  )
}
