import { useReducer } from "react";
import { obtenerTokenStorage } from "../helpers/obtenerTokenls";
import { SolicitudAccept, SolicitudRechazed, SolicitudUser } from "../sockets/socket";
import types from "../types";
import clientAxios from "../urls/urlClient";

export const obtenerSolicitudPubID = (id) => {
    
    return async(dispatch) => {
        try {
            const token = obtenerTokenStorage();

            const {data} = await  clientAxios.get(`/solicitud/${id}`, {
                headers : {
                    token
                }
            })
            if(Object.entries(data.model).length ) {
                dispatch(solicitudGet(data.model))

            }
            
        } catch (error) {
            
        }

    }

}

export const obtenerUnaSolicitudYActualizar = (url , users) => {
    return async(dispatch) => {

        try {
            const token = obtenerTokenStorage();

            const {data} = await  clientAxios.get(url, {
                headers : {
                    token
                }
            })
            
    
            const array = users.filter(solicitud => solicitud._id != data.model._id )
            const array1  = [...array, data.model]
    
            dispatch(solicitudUpdated(array1))
            
        } catch (error) {
            console.log(error.response);
        }

     



    }

}
export const setSolicitudPub = (url, solicitudUser, uid, rol ) => {
    return async(dispatch) => {
        try {
            const token = obtenerTokenStorage();

            const {data} = await  clientAxios.put(url,{
                uid
            },  {
                headers : {
                    token
                }
            })


            const array = solicitudUser.filter(solicitud => solicitud._id != data.model._id )
            const array1  = [...array, data.model]
            // vamos a hacer el uso de los sockets

            console.log(array);
            SolicitudUser({ id : data.model.idUser , 
                solicitudID : data.model.idFriend,
                idSolicitud : data.model._id ,
                rol
            })

            dispatch(solicitudUpdated(array1))
            
        } catch (error) {
            
        }

    }
}

export const setSolicitudPubPost = (url, solicitudUser, uid, rol,  obtener   ) => {

    return async(dispatch) => {
        try {
            const token = obtenerTokenStorage();

            const {data} = await  clientAxios.post(url,{
                uid
            },  {
                headers : {
                    token
                }
            })

            if(obtener){
                SolicitudUser({ id : data.model.idUser , 
                    solicitudID : data.model.idFriend,
                    idSolicitud : data.model._id ,
                    rol
                })
            }
           
            const array = solicitudUser.filter(solicitud => solicitud._id != data.model._id )
            const array1  = [...array, data.model]
            dispatch(solicitudUpdated(array1))
            
        } catch (error) {
            console.log(error);
            
        }

    }
}


export const obtenerSolicitudTercerasPersonas = (url) => {

    return async(dispatch) => {
        
        try {
            const token = obtenerTokenStorage();

            const {data} = await  clientAxios.get(url, {
                headers : {
                    token
                }
            })
            if(Object.entries(data.model).length ) {
                dispatch(solicitudGet(data.model))

            }
            
        } catch (error) {
            
        }
    }

}

export const resetearSolicitudes = () => {

    return async(dispatch) => {
        
        try {
            dispatch(resetValues())
            
        } catch (error) {
            
        }
    }


    
}
export const aceptarSolicitud = (uid, solicitudes,property = false  ) => {
    return async(dispatch) => {
        const url = `/solicitud/solicitud/${uid}`

        const token = obtenerTokenStorage();


        const {data} = await clientAxios.put(url, {property}, {
            headers : {
                token
            }
        })
        const array = solicitudes.filter(solicitud => solicitud._id != data.model1._id )
        const array1  = [...array, data.model1]
        dispatch(solicitudUpdated(array1))
        if(!property){

            SolicitudAccept({
                id: data.model1._id,
                solicitudID : data.model1.idUser,
                
            })

        }

    }

}

export const eliminarPeticionSolicitud = (uid, solicitudes,property = false  ) => {
    return async(dispatch) => {
        const url = `/solicitud/${uid}?property=falase`

        const token = obtenerTokenStorage();


        const {data} = await clientAxios.delete(url, {
            headers : {
                token
            }
        })
        const array = solicitudes.filter(solicitud => solicitud._id != data.model1._id )
        const array1  = [...array, data.model1]
        dispatch(solicitudUpdated(array1))
        if(!property){

            SolicitudRechazed({
                id: data.model1._id,
                solicitudID : data.model1.idUser, 
                userId : data.model1.idFriend,
            })

        }

    }

}
export const obtenerUnaSolictud = (idUser, idFriend) => {

    return async(dispatch) => {
        try {
            const token = obtenerTokenStorage();

            const {data} =await clientAxios.get(`/solicitud?idUser=${idUser}&idFriend=${idFriend}`, {
                headers : {
                    token
                }
            })

            dispatch(solicitudGetOne(data.model))
            
        } catch (error) {
            console.log(error.response);
        }

    }
}
const solicitudUpdated = (data) => ({
    type : types.usersUpdatedValues,
    payload : data

})
const solicitudGet = (data) => ({
    type : types.usersGetValues,
    payload : data

})


const resetValues = () => ({
    type : types.usersResetValues

})

const solicitudGetOne = (data) => ({
    type : types.solicitudOne,
    payload : data

})

