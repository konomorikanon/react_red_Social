import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Solicitudes = ({name}) => {
  return (
    <div className=''>

        <div className="sidebar_solicitud-card">
            <div className="row sidebar_body my-4"  >
                <div className="col-4">
                    <img src={`assets/${name}.jpg`} alt="" />

                </div>
                <div className="col-8">
                    <h4>{name} </h4>
                    <p className='m-0 pb-1'><small>16 amigos en comun </small> </p>
                    <div className="sidebar_boton">
                        <Link to="" className='btn btn-primary'>aceptar </Link>
                        <Link to="" className='btn btn-danger'>rechazar </Link>
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

Solicitudes.propTypes = {}

export default Solicitudes