import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'

const PrincipalRouter= ({auth}) => {
  console.log("a");

  return (

    <>
      <Navbar/>

      {auth ?

       
            
          <Outlet/>

     
          : 
          
          <Navigate to='/auth/login'/>
      
      }
    </>
      
  )
}

PrincipalRouter.propTypes = {}

export default PrincipalRouter