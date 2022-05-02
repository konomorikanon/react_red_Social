import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {Link } from 'react-router-dom';
import { notifyUpdatedView } from '../../actions/notification';
import { notifyFunc } from '../../helpers/stylesFuncions';

export const Notificacion = ({notify}) => {
    const dispatch = useDispatch();

    const {notifications} = useSelector(state => state.notification);

    const handleClickUpdatedViewNotify =  () => {
        if(!notify.NotificacionVista){
            dispatch(notifyUpdatedView(notify._id, notifications))

        }
    }

  return (
      <>
       <ListGroup.Item
        className={notifyFunc(notify.NotificacionVista)}
        >
            <div className="">
                <Link to="/friends"
                    onClick={handleClickUpdatedViewNotify}
                >
                    <p>{notify.notification}</p>
                
                </Link>

                <small className=''>{notify.date}</small>

            </div>
            <div className="">
                <Link to="/url">
                    <i className="fa-solid fa-ellipsis-vertical"></i>

                </Link>
            </div>
            
        </ListGroup.Item>
      
      </>
   
  )
}
