import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap';
import { fileUpload } from '../../helpers/images';
import { useDispatch, useSelector } from 'react-redux';
import { deletePub, deleteReaction, PostPub, putPub, textPubUpdated} from '../../actions/publicaciones'




const Profile_modal = ({handleClose, show, title, typePub, moreOpt = {} }) => {
  const {mostrarImage , image, description, uid, type, FullModel} = moreOpt
 
  const {reactionPub} = useSelector(state => state.reaction)
  const {publicacionesProfile} = useSelector(state => state.publicaciones)

  const [values, setvalues] = useState({
    descripcion : description
  })
 
  

  const [File, setFile] = useState([])
  const dispatch = useDispatch();
  
  const imagen = useRef()
  const toogle1 = useRef()
  const toogle2 = useRef()


  const handleChange = (e) => {setvalues({...values, [e.target.name] : e.target.value} ) }
  const handleChangeImg = (e) => {
    const file =  e.target.files[0]

    if (file.type === "image/jpeg" || file.type === "image/png") {
      fileUpload(file , imagen) 
      setFile(file);
  
      toogle1.current.style.display = "none"
      toogle2.current.style.display = "block"
    }  
   

  }
  const handleClickRemoveimg = () => {
    toogle2.current.style.display = "none"
    toogle1.current.style.display = "block"
    setFile({})
  }

  const handleClickRemovePub = () => {


    const pubs = publicacionesProfile.map(pub => pub.uid !== uid)
    console.log(publicacionesProfile);
    
    dispatch(deletePub(`/publication/${uid}`,pubs  ))

    const value = reactionPub.find(react => react.idPublicacion === uid )

    dispatch(deleteReaction(value, reactionPub ))


    
  }
  const handleSubmit = (e) => {

    e.preventDefault() 
    if (type == "update") {
      if(Object.entries(File).length > 0){
        dispatch(putPub(
          values, File, typePub, `/publication/${uid}`, "publication", publicacionesProfile
        ))
      }else{
        dispatch(textPubUpdated(values.descripcion, `/publication/pubText/${uid}`, publicacionesProfile))

      }
     

      return
      
    }

    if(typePub == "COVER_PROFILE"  || typePub == "COVER_PROFILE_UPDATED"){

      dispatch(PostPub(
        values, File, typePub, '/publication', "cover"
      ))
    }else if(typePub == "SUBIR_PUBLICACION"){

      dispatch(PostPub(
        values, File, typePub, '/publication', "publicacion"
      ))
    }else{
      dispatch(PostPub(
        values, File, typePub, '/publication', "profile"
      ))

    }

      
    

  

  }
  return (
    <Modal show={show} onHide={handleClose} className="mt-5 profile_modal">
        <Modal.Header closeButton>
            <Modal.Title> {title}</Modal.Title>
            
        </Modal.Header>
        <Modal.Body>
          <div className="">

            <form action="" encType='multipart/form-data'
              onSubmit={handleSubmit}
            > 
              <div className="form-group">
                <input type="text" name="descripcion" 
                  value={values.descripcion}   
                  placeholder='que estas pensando'
                  className='profile_input_text'
                  onChange={handleChange}  
                />
              </div>
           
              <div className="form-group" id="profile_upload" ref={toogle1}>
                <label htmlFor="val" >
                   {mostrarImage ? 
                      <div className="profile_modal_box">
                      <img src={image} className='profile_img_change' alt="img"  />
    
                    </div>
                   
                   : 
                    <i className="fa-solid fa-image"></i>
                   
                   }
                    <p className="profile_modal_text">  click para subir imagen</p>
                </label>
                <input type="file"  
                  name='val'
                  id="val"
                  onChange={handleChangeImg}
                 />


              </div> 
                
              <div className="" id="profile_toogle" ref={toogle2} >
                <div className="profile_modal_box">
                  <img src="" className='profile_img_change' alt="img" ref={imagen} />

                </div>

                  <button
                  type='button'
                    onClick={handleClickRemoveimg}
                    className="btn btn-primary d-block my-2"
                  >
                    colocar otra imagen
                  </button>

                  <button
                    type='submit'
                      className="btn btn-success d-block my-2"
                      onClick={handleClose}
                    >
                     actualizar perfil
                  </button>

                  
                 

              </div>
            
                { FullModel &&   <button
                    type='button'
                      className="btn btn-danger d-block my-2"
                      onClick={handleClickRemovePub}
                    >
                     borrar publicacion
                  </button>
                  }
              
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        
        </Modal.Footer>
    </Modal>
  )
}

Profile_modal.propTypes = {}

export default Profile_modal