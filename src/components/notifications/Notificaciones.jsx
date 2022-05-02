import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotify } from '../../actions/notification';
import { Notificacion } from './Notificacion';

export const Notificaciones = ({title}) => {
    const dispatch = useDispatch();
    const {notifications} = useSelector(state => state.notification)

    const [notification, setnotification] = useState([]);

    useEffect(() => {
       
        setnotification(notifications);
      

    }, [notifications])
    useEffect(() => {
    
      return () => {
          
          dispatch(resetNotify());
        
      }
    }, [])
    
    
    
  return (
    <>
        <div className="">
            <h4 className="p-2">Notificaciones</h4>

            {
               (!notification.length) && <p
                className='text-center my-5'
               >
                   no existen notificaciones por el momento
               </p>
            }


            <ListGroup>
                

                {
                    notification.map(ap => (
                        
                        <Notificacion
                            key={ap._id}
                            notify={ap}

                        />
                    ))
                }
        
            
            
                
            </ListGroup>     

        </div>
    
    
    </>
  )
}