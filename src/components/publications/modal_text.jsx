
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { deletePub, deleteReaction, textPubUpdated } from '../../actions/publicaciones';
import Profile_modal from './Profile_modal';

export const ModalText = ({show, handleClose, title, opt = {} }) => {

  const {reactionPub} = useSelector(state => state.reaction)
  const {publicacionesProfile} = useSelector(state => state.publicaciones)

    const dispatch = useDispatch();

    const {description, uid } = opt
   

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    const [publicacion, setpublicacion] = useState({
        descripcion : description
    })
    

    const handleSubmit = (e) => {
        e.preventDefault();
      
        if(publicacion.descripcion.trim().length > 0){

            dispatch(textPubUpdated(publicacion.descripcion, `/publication/pubText/${uid}`, publicacionesProfile))
            setpublicacion({
                descripcion : "" 
            })   
        }
    }

    const handleChangePub = (e) => {
        setpublicacion({
            [e.target.name] : e.target.value
        })
    }
    const handleClickRemovePub = () => {
        const pubs = publicacionesProfile.filter(pub => pub.uid !== uid)
        console.log(pubs);

        dispatch(deletePub(`/publication/${uid}`, pubs ))

        const value = reactionPub.find(react => react.idPublicacion === uid )

        console.log("val");
        dispatch(deleteReaction(value, reactionPub ))
        
      }
  return (
      <>
        <Modal show={show} onHide={handleClose} className="mt-5 profile_modal">
        <Modal.Header closeButton>
            <Modal.Title> {title}</Modal.Title>
            
        </Modal.Header>
        <Modal.Body>
        <div className="row profile_public_body">
            
                

                <div className="col-12">
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

                        <button
                            type='submit'
                            className="btn btn-success d-block my-2"
                            onClick={handleClose}
                            >
                            actualizar publicacion
                        </button>
                        <button
                            type='button'
                            className="btn btn-danger d-block my-2"
                            onClick={handleClickRemovePub}
                            >
                            borrar publicacion
                        </button>
                    </form>
                </div>

                <div className="col-6 mt-2">
                <button className='btn publicaciones_react align-items-center w-100'
                    onClick={handleShow1}
                
                > 
                    <h4>
                        <i className="fa-solid fa-image"></i>
                                    
                        </h4>
                        <h5 className='ps-2'> imagenes</h5>

                    </button>

                </div>
             
                
                    
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        
        </Modal.Footer>
    </Modal>

    <Profile_modal
            
            handleClose={handleClose1}
            show={show1}
            title={'actualizar publicacion '}
            typePub={"SUBIR_PUBLICACION"}
            moreOpt={{description : publicacion.descripcion, uid,type : "update", FullModel : true }}
        
    />

</>
  )
}
