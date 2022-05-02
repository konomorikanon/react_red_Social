import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Solicitudes from './solicitudes'


const Sidebar = props => {

  return (
    <>
        <div className="sidebar_sidebar">
            <h1 className='text-capitalize text-primary'>inicio</h1>

            <ul className='list-group sidebar_list my-3'>
                <li className=''><Link to="" className='nav-link text-dark  py-1 text-capitalize'>  <h4>inicio</h4></Link>  </li>
                <li className=''><Link to="" className='nav-link text-dark  py-1 text-capitalize' > <h4>solicitudes</h4>  </Link></li>
            </ul>

            <div className="sidebar_solicitud text-capitalize">
                <h4>solicitudes enviadas</h4>
              
              

            </div>
        </div>
    
    </>
  )
}

Sidebar.propTypes = {}

export default Sidebar