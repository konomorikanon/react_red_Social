import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerUnaSolictud } from '../../actions/solicitud'
import { Botones } from './Botones'

export const Solicitud = () => {
    const dispatch = useDispatch()
    const {userOnePub} = useSelector(state => state.users)
    const {user} = useSelector(state => state.user)

    useEffect(() => {
      
        if (Object.entries(userOnePub).length) {
            console.log(userOnePub);
            dispatch(obtenerUnaSolictud(user.uid, userOnePub.uid));
            
        }
    

      return () => { 
        
      }
    }, [userOnePub])
    
  return (

    <div>
      
        <div className="publicaciones_reaccion bg-white">
            
             <Botones

            />
          
            
           
            <div className="col-6">
                <button className='btn publicaciones_react align-items-center w-100'> 
                    <h4>
                        <i className="fa-solid fa-comment"></i>
                        
                    </h4>
                    <h4 className='ps-2'> enviar mensaje</h4>

                </button>
            </div>
        </div>
        
    </div>
  )
}
