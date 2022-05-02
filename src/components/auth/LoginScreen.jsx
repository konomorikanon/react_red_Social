import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../helpers/alert'
import { loginAction } from '../../actions/auth'

const LoginScreen = () => {

    const {msgStatus, status, message, errs} = useSelector(state => state.user)

    const dispatch = useDispatch();
    const [values, handleChange] = useForm({
        email: '',
        password: '',
    })
    const {email,password} = values

    const [errors, seterrors] = useState('')
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (!validator.isEmail(email) || password.trim().length < 7) {
            seterrors('password o email de formato incorrecto, asegure escribir un email valido, o su password supere los 8 caracteres')
            return;
        }
        seterrors('')
        dispatch(loginAction({email, password}))
        

    }
  return (
    <div className="auth_window">
    <form action="" className="auth_form p-3 text-capitalize" onClick={handleSubmitLogin} >
        {msgStatus && <Alert
            err={true}
            msg={msgStatus}
        /> }
        <h1 className='text-center'>login</h1>
       

        <div className="form-group mt-1">
            <label htmlFor="">email</label>
            <input type="email" 
                name='email'
                className='auth_input' 
                placeholder='escribe tu email'
                value={email} 
                onChange={handleChange}
                />
        </div>

        <div className="form-group mt-">
            <label htmlFor="">passowrd</label>
            <input type="password" 
                    name='password' 
                    className='auth_input' 
                    placeholder='escribe tu password'
                    value={password} 
                    onChange={handleChange}

                    />
        </div>

        <div className="form-group mt-3">
        {
                (status) ? 
                <button type='submit ' disabled className='btn btn-success opacity-75 d-block w-100'>
                    registrate
                </button>:
                <button type='submit '  className='btn btn-success d-block w-100'>
                    registrate
                </button>

            }
        </div>
        <p className='my-2 text-center'> ya tienes cuenta?, entonces <Link to='/auth/register' className=''>registrate </Link> </p>

        { (errors) &&  <div className="alert alert-danger"> {errors}</div>}
            {(message ) &&  <Alert  
                err={errs}
                msg={message}
            />}

        <p className="text-center">o</p>

        <button type='button' className='auth_facebook' ><i className="fa-brands fa-facebook"></i> iniciar sesion con facebook </button>
        <button type='button' className='auth_google'><i className="fa-brands fa-google"></i> iniciar sesion con google </button>
    </form>
</div>
    
  )
}

LoginScreen.propTypes = {}

export default LoginScreen