import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Profile from './Profile'
import { Cover } from './Cover'
import { obtenerCoverAction, obtenerCoverActionId, obtenerPerfil, obtenerPerfilId, reiniciarValoresProfile } from '../../actions/publicaciones'
import { Solicitud } from './solicitud'


const CoverProfile = ({uid = "", otherUser = false}) => {
  const {user } = useSelector(state => state.user)
  const {userOnePub} = useSelector(state => state.users);
  const dispatch = useDispatch()


  const { name, information}= user 

  const {pubProfile, pubCover, obtenerProfile, obtenerCover} = useSelector(state => state.user)


  const [publicacionProfile, setpublicacionProfile] = useState({})
  const [publicacionCover, setpublicacionCover] = useState({})
 
  const obtenerPublicacionProfile = () => {
     
        setpublicacionProfile(pubProfile)
      
     
  }
  const obtenerPublicacionCover = () => {
    setpublicacionCover(pubCover)
      
  }

  useEffect(() => {

      if(obtenerProfile){
          if(!uid){
            dispatch(obtenerPerfil())

          }else{
            dispatch(obtenerPerfilId(uid))

          }
      }
      obtenerPublicacionProfile()
    
  }, [pubProfile, obtenerProfile ])
  


    useEffect(() => {
        if(obtenerCover){
            if(!uid){
                dispatch(obtenerCoverAction())
            }else{
                dispatch(obtenerCoverActionId(uid))
            }

        }
        console.log(obtenerCover);
        obtenerPublicacionCover()
        
    }, [pubCover,obtenerCover ])
  

    useEffect(() => {
      
    
      return () => {
        dispatch(reiniciarValoresProfile())
      }
    }, [])
    
  



  return (
    <div className='profile_header'>
         <div className="profile_portada">
             {
                 (Object.entries(publicacionCover).length > 0) ?
                    <Cover 
                        pub={publicacionCover}
                        typePub={"COVER_PROFILE_UPDATED"} 
                        mostrarImage={true}
                        otherUser={otherUser}
                    />

                 
                 :
                 <Cover
                    pub={{image : './assets/banner.jpg',
                        description : '',
                    }}
                    typePub={"COVER_PROFILE"}
                    otherUser={otherUser}


                 
                 /> 

             }
        </div>

        <div className="profile_profile">
            {
                 (Object.entries(publicacionProfile).length > 0) ?
                    <Profile 
                        pub={publicacionProfile}
                        typePub={"UPDATED_PROFILE"} 
                        mostrarImage={true}
                        otherUser={otherUser}

                    />
                 :
                 <Profile 
                        pub={{image : `assets/user.png`, description : ''}}
                        typePub={"PROFILE"}
                        otherUser={otherUser}

                    />

             }
        </div>
        <div className="profile_infomation text-center py-2">
          {
            !otherUser ? 
            <h3>{name}</h3>

            
            :
            <h3>{userOnePub.name}</h3>



          }


        </div>

        {otherUser && <Solicitud/>}

    </div>
  )
}

CoverProfile.propTypes = {}

export default CoverProfile