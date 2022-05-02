import { obtenerTokenStorage } from "../helpers/obtenerTokenls";
import types from "../types";
import clientAxios from "../urls/urlClient";

export const obtenerListadoAmigos = () => {
    return async(dispatch) => {
        const token = obtenerTokenStorage()
        try {
            const api = await clientAxios.get("/user", {
                headers : {
                    token
                }
            })

            if (api.data) {

                dispatch(listaUsuarios(api.data.users))
            }
           
            
        } catch (error) {
         console.log(error.response);   
        }


    }
}

export const getUserId = (id) => {


    return async(dispatch) => {
        
        try {
            const token = obtenerTokenStorage();

            const {data} =await clientAxios.get(`/user/${id}` , {
                headers : {
                    token
                }
            })

            // obtenerUnUsuario
            dispatch(obtenerUnUsuario(data.model))


        } catch (error) {
            console.log(error);
            
        }
       

    }

}
export const  removeOneUserAction = () => {
    return (dispatch) => {
        try {
            
            dispatch(DeleteOneUser())
        } catch (error) {
            
        }
    }
}

const listaUsuarios = (data) =>( {
    type: types.userList,
    payload: data

})

const obtenerUnUsuario = (data) => ({
    type : types.userOneGet,
    payload: data

})

const DeleteOneUser = (data) => ({
    type : types.userOneDelete,

})