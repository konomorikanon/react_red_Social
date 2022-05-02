import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Comentario = ({name}) => {
  return (
    <div className="row">
         <div className="col-2">
            <div className="comentarios_profile">
                <img src={`assets/${name}.jpg`} alt=""  className=''/>
                
            </div>
        </div>
        <div className="col-10">
            <Link className='nav-link text-dark' to=""> <h5 className='' > {name}</h5></Link> 
            <p className='bg-light p-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit, quidem eum culpa consequuntur aliquid voluptatibus, consequatur et qui quod, iste voluptas tenetur praesentium doloribus? Voluptates nostrum dolorem assumenda similique officiis? </p>

        </div>
    </div>
       
    
  )
}

Comentario.propTypes = {}

export default Comentario