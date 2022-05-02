import React, { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Publicacion from './publicacion'
import { useDispatch, useSelector } from 'react-redux'
import { publicacionesProfileGet, reiniciarValores } from '../../actions/publicaciones'


const Publicaciones = React.memo(({api = [], morePubs = "profile", id = "", user = {} }) => {

    const [values, setvalues] = useState({})
    const dispatch = useDispatch()
    const {publicacionesProfile, mostrarBoton, page, pagination} = useSelector(state => state.publicaciones)

    const footer = useRef()

    // const { name, profile} = user 
    const obtenerMasEntradas = () => {

        // aqui vamos a hacer una paginacion
        if (morePubs == "profile") {
            dispatch(publicacionesProfileGet(publicacionesProfile, page, pagination))      
            
        }

    }

    const handleChange = (e) => {
        setvalues({
            ...values,
            [e.target.name] : e.target.value
        })

    }

    const newHandleChange =   useCallback((e) => {
        handleChange(e)
    },[values],
  )

    const obtenerFormularios = () => {
        let object; 
        // console.log("desde obtenerFormularios ");

        for (let i = 0; i < api.length; i++) {
            object = {
                ...object,
                [api[i].uid] : ''
            }
            
        }
        setvalues(object)

    }
    useEffect(() => {   



        obtenerFormularios()
    }, [api])

    
    useEffect(() => {
    
    
       console.log("publicacion");
      }, [])
   
    

  return ( 
    <div className='publicaciones'>
        
        { (Object.entries(user).length ) &&

                api.map(pub => (
                    <Publicacion
                        key={pub.uid}
                        publicacion={pub}
                        handleChange={newHandleChange}
                        values={values}
                        user={user}
                        
                    />
                ))
        
        }
        
        
        {
            mostrarBoton && <footer className="val text-center" ref={footer}>
            <div className="btn btn-primary mx-auto" 
                onClick={obtenerMasEntradas}
            >
                obtener mas publicaciones
            </div>


        </footer>
        }

       
    </div>
  )
})

Publicaciones.propTypes = {
    
}

export default Publicaciones