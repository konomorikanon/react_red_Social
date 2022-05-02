import React from 'react'
import { useSelector } from 'react-redux'

export const Botones = () => {
    const {userOnePub, solicitudOne} = useSelector(state => state.users)
    console.log(userOnePub, solicitudOne);


  return (
    <>
        {
            (userOnePub.uid === solicitudOne.idUser) && <

            >
               
            
                {(solicitudOne.roleFriend === "SEND_SOLICITUD") &&  


                 <div className="col-6 ">

                    <button className='btn publicaciones_react align-items-center w-100'> 
                        <h4>
                            <i className="fa-solid fa-user"></i>
                            
                        </h4>
                        <h4 className='ps-2'>  aceptar solicitud</h4>

                    </button>
                </div>
                
                }

                
            
            </>
            }

            {(userOnePub.uid === solicitudOne.idFriend) && <

            >
             
            
                {(solicitudOne.role === "SOLICITUD_MODE") &&  


                 <div className="col-6 ">

                    <button className='btn publicaciones_react align-items-center w-100'> 
                        <h4>
                            <i className="fa-solid fa-user"></i>
                            
                        </h4>
                        <h4 className='ps-2'> eliminar solicitud</h4>

                    </button>
                </div>
                
                }

                
            
            </>
        }
       
            
    </>
    
  )
}
