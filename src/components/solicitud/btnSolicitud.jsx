import React, { useEffect } from 'react'

export const BtnSolicitud = ({solicitud = {}, handleClickSolicitud, handleClickRemoveSolicitud, handleClickAcceptSoli, handleClickRechazarSoli}) => {

    const { role , solicitudMode, roleFriend } = solicitud;
    useEffect(() => {
      console.log(solicitud);
    }, [solicitud])
    
  return (
    <>
        {(solicitudMode) ? 
            <>
                {(roleFriend == "SEND_SOLICITUD") && 
                
                    <>
                      <button 
                      onClick={handleClickAcceptSoli}
                        className='btn btn-success mt-1 ms-1'
                        >
                        aceptar solicitud
                    </button>
                    <button 
                        className='btn btn-danger  mt-1 ms-1 '
                        onClick={handleClickRechazarSoli}
                        >
                        rechazar solicitud
                    </button>
                    </>
                    
                }

            {(roleFriend == "NO_SOLICITUD") && <button 
                className='btn btn-primary '
                onClick={handleClickSolicitud}
                    >

                    enviar solicitud 
                </button>
                
            }


            </>
        : 
        
        <>
            {(role == "NO_SOLICITUD" || !role) && <button 
                className='btn btn-primary '
                onClick={handleClickSolicitud}
                    >

                    enviar solicitud 
                </button>
                
            }
            
            {
                
                (role == "SOLICITUD_MODE") && <div className="">
                    <p className='m-0'>solicitud enviada</p>

                    <button 
                        className='btn btn-danger '
                        onClick={handleClickRemoveSolicitud}
                    >

                        eliminar solicitud
                    </button>
                </div>

            }
        </>
        }
   
    
      
        
    </>
  )
}

