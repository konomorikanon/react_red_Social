import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Comentarios from './comentarios'
import Profile_modal from '../publications/Profile_modal'
import { ModalText } from '../publications/modal_text'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerReaccionPubID, resetearValoresReaction, setReactPub } from '../../actions/publicaciones'
import { reactionFuc } from '../../helpers/stylesFuncions'
import { obtenerCantidadReactionPub } from '../../actions/reaction'

const Publicacion = ({publicacion, handleChange, values, name = [], user }) => {



    
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    const {reactionPub, valuesId, numbersPub} = useSelector(state => state.reaction)
    const {publicacionesProfile} = useSelector(state => state.publicaciones)
    const {user : usuario} = useSelector(state => state.user)

    const [reaction, setreaction] = useState({})
    const [reactionNum, setreactionNum] = useState({})
    const [condition, setcondition] = useState(false)
    const [obtenerPrimeraVez, setobtenerPrimeraVez] = useState(true)


    const obtenerReact  = () => {

        const value = reactionPub.find(react => react.idPublicacion === publicacion.uid )
        const numValue = numbersPub.find(react => react.id === publicacion.uid )

        if (value) {
            setreaction(value) 
            setreactionNum(numValue)
            setcondition(true)            
        }

    }

    const resetearReact  = () => {

        dispatch(resetearValoresReaction())
        setobtenerPrimeraVez(false)

    }
 
    useEffect(() => {

        if(obtenerPrimeraVez){
            if(reactionPub.length > publicacionesProfile.length){
                console.log("desde useEffect");
                return;
    
            }
    
            console.log(publicacion.uid);
            dispatch(obtenerReaccionPubID(publicacion.uid))
            // dispatch(obtenerCantidadReactionPub(publicacion.uid))

        }

        setcondition(false)
        console.log("desde publicaciones");

        
    }, [])

    useEffect(() => {
        if(reactionPub.length > 0) {
            obtenerReact()

        }


    }, [valuesId] )

    
    
   
   
    const handleClickReact =  () => {

        
        console.log(reactionPub.length );
        dispatch(setReactPub(reaction._id, reactionPub, publicacionesProfile ))


    }
    
    return (
        <>
        {
            (reactionPub.length === publicacionesProfile.length && !condition) && obtenerReact()
        }
        {
            // (reactionPub.length > publicacionesProfile.length && !condition) && resetearReact()

        }
    <div className="publicaciones_publicacion my-4">
        <div className="card">
            <div className="card-header  publicaciones_header_body">

                <div className="px-1">
                    <div className="d-flex publicaciones_body ">
                        <div className="publicaciones_user">
                            <div className="publicaciones_header_profile">
                                <div className="d-flex">
                                    {/* condicioar si existe o no */}
                                    <img src={user.profile} alt=""  className='me-1'/>
                                    <h4>{user.name} </h4>

                                </div>

                                { (user.uid === usuario.uid ) &&   
                                    <button to="" className="nav-link text-dark publicaciones_btn"  onClick={handleShow}>
                                        <i className="fa-solid fa-ellipsis-vertical"></i>

                                    </button>

                                }
                             
                              
                            </div>
                            <div className="my-2">
                                 {publicacion.description}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="card-body p-0">
                {publicacion.image  &&  <div className="publicaciones_img">
                    <img src={publicacion.image} alt=""  className=''/>

                </div>}
               
                <p className='mx-5'>
                    <i className="fa-solid fa-heart pe-2"></i>
                    {publicacion.interacciones}
                </p>

                <div className="publicaciones_reaccion ">
                    <div className="col-6 ">
                        <button 
                            className={reactionFuc(reaction.reaction)}
                            onClick={handleClickReact}    
                        > 
                       
                            <h5>
                            {/* {reactionFuc(reaction.reaction)} */}
                                <i className="fa-solid fa-heart"></i>
                                
                            </h5>
                            <h5 className='ps-2' > reaccionar</h5>
                            
                                
                        
                          

                        </button>
                       
                    </div>

                    <div className="col-6 ">
                        <button className='btn publicaciones_react align-items-center w-100'> 
                            <h4>
                                <i className="fa-solid fa-comment"></i>
                                
                            </h4>
                            <h4 className='ps-2'> comentar</h4>

                        </button>
                       
                    </div>

                </div>
            </div>

            { <div className="">
                <Comentarios
                    user={usuario}
                    name={publicacion.uid}
                    handleChange={handleChange}
                    values={values}
                
                />
            </div>
            } 
        </div>

    </div>

    {
        (publicacion.image) ? 
        
        <Profile_modal
                    
            handleClose={handleClose}
            show={show}
            title={'actualizar una publicacion '}
            typePub={`${publicacion.role}_UPLOAD`}
            moreOpt={{
                mostrarImage : true,
                image: publicacion.image,
                uid: publicacion.uid,
                description :( publicacion.description) ? publicacion.description : "",
                type : "update",
                FullModel : true
            
            }}

        />
        
        
        : 
        <ModalText
            handleClose={handleClose}
            show={show}
            title={'actualizar texto '}
            opt={{description : publicacion.description, uid: publicacion.uid,}}

        />
    }



</>

  )
}

Publicacion.propTypes = {}

export default Publicacion