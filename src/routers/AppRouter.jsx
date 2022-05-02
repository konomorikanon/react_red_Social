import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { authAction} from '../actions/auth'
import PrincipalRouter from './PrincipalRouter'
import PrincipalScreen from '../components/RedApp/PrincipalScreen'
import AuthScreen from './AuthScreen'
import LoginScreen from '../components/auth/LoginScreen'
import RegisterScreen from '../components/auth/RegisterScreen'
import Token from '../components/auth/Token'
import ProfileScreen from '../components/RedApp/ProfileScreen'
import SocketScreenExample from '../components/RedApp/SocketScreenExample'
import { conectar, usuarioConectado } from '../sockets/socket'
import FriendsScreen from '../components/RedApp/FriendsScreen'
import { UserIdScreen } from '../components/RedApp/UserIdScreen'
import { NotificacionesScreen } from '../components/RedApp/NotificacionesScreen'
import { getAllNotificationUser } from '../actions/notification'

const AppRouter = props => {

    const dispatch = useDispatch()
    const {auth, user} = useSelector(state => state.user)
    const {usuarios, solicitudUser } = useSelector(state  => state.users)
    const {notifications} = useSelector(state  => state.notification)

    useEffect(() => {
        if (Object.keys(user).length === 0 ) {
            dispatch(authAction()) 
            
        }else{
            conectar(dispatch, usuarios, notifications, solicitudUser )

            usuarioConectado(user.uid, user.name)

            // traer notificaciones
            dispatch(getAllNotificationUser())



        }
        console.log("user change");


    }, [user])
    
    
  return (

    <div className="">
        <Router>
            <Routes>
                <Route path='*' element={<PrincipalRouter auth={auth} />}>
                    <Route path='' element={<PrincipalScreen/>}/>
                    <Route path='profile' element={<ProfileScreen/>}/>
                    <Route path='socketExample' element={<SocketScreenExample/>}/>
                    <Route path='friends' element={<FriendsScreen/>}/>
                    <Route path='user/:id' element={<UserIdScreen/>}/>
                    <Route path='notificaciones' element={<NotificacionesScreen/>}/>

                </Route>

                <Route path='/auth' element={<AuthScreen auth={auth} />}>
                    <Route path='login' element={<LoginScreen/>}/>
                    <Route path='register' element={<RegisterScreen/>}/>
                    <Route path='token/:id' element={<Token/>}/>
                    <Route path='*' element={<Navigate to={'login'} />}  />


                </Route>

            </Routes>
        </Router>
    </div>
  )
}

AppRouter.propTypes = {}

export default AppRouter