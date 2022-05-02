import { usuarioConectado, usuarioNuevo } from "../sockets/socket";
import types from "../types"
import clientAxios from "../urls/urlClient";

export const registerAction = (datos) => {
    return async(dispatch) => {
        dispatch(statusOn())
        try {

            
            const {data} = await clientAxios.post('/auth/login', datos);

            
            localStorage.setItem('token', data.token)

            dispatch(register())
            dispatch(statusOff())


        } catch (error) {
            if (error.response) {
                dispatch(messageErrs(error.response.data.errs[0].msg) )
            }
        
            dispatch(statusOff())

            
        }


    }
}

export const loginAction = (datos = {}) => {

return async(dispatch) => {
        dispatch(statusOn())
        try {

        console.log(datos);

            
            const {data} = await clientAxios.post('/auth/authLogin', datos);

            localStorage.setItem('token', data.token)
           if(data.msg){
                dispatch(loginAuth(data.msg))

           }else{
                dispatch(login({
                    user : data.model,
                    auth : true
                }))

           }

           dispatch(statusOff())


        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if(error.response.data.errs){
                    dispatch(messageErrs(error.response.data.errs[0].msg) )

                }else{

                    dispatch(messageErrs(error.response.data.msg))
                }
            }
        
            dispatch(statusOff())

            
        }


    }
}
export const authAction = () => {
 
    return async(dispatch) => {
        try {
            const storage = localStorage.getItem('token');
            if (storage) {
                // ejecuta dispatch
                const {data} = await  clientAxios.get('/auth/login', {
                    headers: {
                        token: storage
                    }
                });
                if (data.model.status) {
                    dispatch(login({
                        user : data.model,
                        auth : true
                    }))
                    
                    
                    console.log("saaaaa");
                }else{
                    dispatch(login({
                        user : data.model,
                        auth : false
                    }))
                   
                    // dispatch(messageErrs("verifique su email para iniciar ") )

                }

                
            }else{

                dispatch(authError())


            }

        } catch (error) {
            console.log(error);

            const { data}  = error.response
            if (data) {
                dispatch(authErrorToken(data.error.message))
                console.log(data.error);
            }
            // console.log();
        }
    }
}

export const verificarTokenActions = (id) => {

    return async(dispatch) => {

        const token = localStorage.getItem('token')

        try {
        
            const {data} = await  clientAxios.get(`/auth/loginStatus/${id}`, {
                headers: {
                    token
                }
            });
            console.log(id);
            usuarioNuevo(id);

            dispatch(login({
                user : {},
                auth : true
            }))


        } catch (error) {
            console.log(error);
            
        }

    }

}


const statusOn = () => ({
    type: types.authStatus,
    payload: true

})
const statusOff = () => ({
    type: types.authStatus,
    payload: false

})


const register = () =>({
    type: types.authMessage,
    payload: {
        msg : 'se a registrado correctamente, checa tu email para activar la cuenta',
        errs: false
    }
})


const loginAuth = (msg) =>({
    type: types.authMessage,
    payload: {
        msg ,
        errs: false
    }
})
const messageErrs = (msg) => ({
    type: types.authMessage,
    payload: {
        msg,
        errs: true
    }
})

const login = (data) =>  ({
    type: types.authLogin,
    payload: data
})

// auths

const authError = () => ({
    type: types.authError,
    
})

const authErrorToken = (msg) => ({
    type: types.authErrorToken,
    payload: msg
    
})
