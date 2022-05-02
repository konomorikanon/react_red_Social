import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import Alert from '../helpers/alert'
import {  useParams, useNavigate } from 'react-router-dom'
import { verificarTokenActions } from '../../actions/auth'

const Token = () => {
  const navegate = useNavigate()
  const dispatch = useDispatch()

  const {id} = useParams();
  const {msgStatus, user} = useSelector(state => state.user)
   


  const verificarToken = () => {
    const token = localStorage.getItem('token')

    if (id === token ) {
      console.log("token");
      return
    }
    navegate('/auth/login')
  }

  const verificar = () => {
    console.log(user._id);

    dispatch(verificarTokenActions(user._id))
  }

  useEffect(() => {
    verificarToken()

  }, [])
  


  return (
    <div className='auth_window'>
        <div className="auth_token text-center p-3">
            {msgStatus && <Alert
                err={true}
                msg={msgStatus}
            /> }
            <h1>verificar token</h1>

            <button className='btn btn-primary' onClick={verificar} >haga click para comprobar e iniciar sesion </button>

            <p className='my-2'>si usted no envio datos puedes ignorar este apartado</p>
        </div>
        
    </div>
  )
}

Token.propTypes = {}

export default Token