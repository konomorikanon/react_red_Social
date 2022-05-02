import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Alert from '../components/helpers/alert'

const AuthScreen = ({auth}) => {



  return (
     <>
   
     {!auth ?
          
          <Outlet/>
          : 
          
          <Navigate to='/'/>
      
      }
     
     </> 

 
  )
}

AuthScreen.propTypes = {}

export default AuthScreen