import React from 'react'
import PropTypes from 'prop-types'
import Comentario from './comentario'

const Comentarios = ({name, handleChange, values, user}) => {
    // console.log(Object.entries(values).length);
  return (
    <>
    
        <div className="container my-3">
            
            {/* <Comentario
                name={name}
            /> */}
            


            {

                (Object.entries(values).length >= 1 ) &&
                <div className="form">
                    <form action="">
                        <div className="form-group d-flex comentarios_input" >
                            <label htmlFor="" className=''>
                                <img src={user.profile} alt="" />
                            </label>
                            <input type="text" 
                                className='form-control' 
                                name={name}
                                onChange={handleChange}
                                value={values[name]}
                            />
                        </div>
                    </form>

                </div>
            }
           
        </div>
    </>
  )
}

Comentarios.propTypes = {}

export default Comentarios