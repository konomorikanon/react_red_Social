import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { textPub } from '../../actions/publicaciones'
import Profile_modal from '../publications/Profile_modal'

export const MsgPub = () => {
    const {user} = useSelector( state => state.user)
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [publicacion, setpublicacion] = useState({
        descripcion : ''
    })
    

    const handleSubmit = (e) => {
        e.preventDefault();
      
        if(publicacion.descripcion.trim().length > 0){

            dispatch(textPub(publicacion.descripcion, '/publication/pubText'))
            setpublicacion({
                descripcion : ''
            })   
        }
    }

    const handleChangePub = (e) => {
        setpublicacion({
            [e.target.name] : e.target.value
        })

    }
  return (

    <>
     <div className='profile_public mt-4 p-3'>

        <div className="row profile_public_body">
            <div className="col-12 m-2 text-capitalize">
                <h2>crear una nueva publicacion </h2>
            </div>
            <div className="col-lg-1 col-2">
                <img src={user.profile} alt="" className='publication_profile ' />
            </div>

            <div className="col-lg-11 col-10">
                <form action=""
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="descripcion" 
                            value={publicacion.descripcion}
                            onChange={handleChangePub}
                            placeholder='escribe lo que piensas...'
                            className='form-control'/>
                    </div>
                </form>
            </div>

            <div className="col-6 mt-2">
            <button className='btn publicaciones_react align-items-center w-100'
                onClick={handleShow}
            
            > 
                <h4>
                    <i className="fa-solid fa-image"></i>
                                
                    </h4>
                    <h5 className='ps-2'> imagenes</h5>

                </button>

            </div>
            
                
        </div>
        </div>

        <Profile_modal
            
                handleClose={handleClose}
                show={show}
                title={'subir una publicacion '}
                typePub={"SUBIR_PUBLICACION"}
                moreOpt={{description : publicacion.descripcion }}
            
        />
    
    </>
   
  )
}