import { obtenerTokenStorage } from "../helpers/obtenerTokenls"
import types from "../types"
import clientAxios from "../urls/urlClient"

// el uid del post es del usuario a quien recibirá la notificación
export const postNoficationAction = (url ,role, uid) => {
    return async(dispatch) => {

        try {

            const datos = {
                role,
                idUser : uid
            }

            const token = obtenerTokenStorage();

            const {data} = await clientAxios.post(url,datos , {
                headers : {
                    token,
                    
                }
            })
           dispatch(setNotifIcation(data.notificacion))
            
        } catch (error) {
            console.log(error.response);
            
        }


    }

}
export const obtenerUnaNotificacionYActualizar = (url, notificaciones) => {
    return async(dispatch) => {

        try {

            const token = obtenerTokenStorage();

            const {data} = await clientAxios.get(url , {
                headers : {
                    token,
                    
                }
            })
            console.log(data);
            dispatch(setNotifIcation(data.notificacion))
            
        } catch (error) {
            console.log(error.response);
            
        }


    }

}
// el uid del delete es lo de la notificacion
export const deleteNoficationAction = (notifications, uid ) => {
    return async(dispatch) => {

        try {
           
            // vamos a obtener las notificaciones

            const notify = notifications.filter(n => n._id !== uid)


            dispatch(uptatedNotify(notify))

            
        } catch (error) {
            console.log(error.response);
            
        }


    }

}

export const getAllNotificationUser = () => {
    return async(dispatch) => {

        try {
            const token = obtenerTokenStorage();
            const {data} = await clientAxios.get('notificaciones',{
                headers:{
                    token
                }
            })

            dispatch(getAllNotify(data))

            
        } catch (error) {
            console.log(error.response);
            
        }
    }



}

export const resetNotify = () => {
    return async(dispatch) => {
        try {
            const token = obtenerTokenStorage();
            const {data} =await  clientAxios.put('/notificaciones/', {}, {
                headers : {
                    token
                }
            })
            // uptatedNotifyAll()
            dispatch(uptatedNotifyAll(data.models))
            
        } catch (error) {
            console.log(error.response);
        }

        


    }


}
// actualizar si leyó la notificacion para actualizar

export  const notifyUpdatedView = (uid, notifications) => {
    return async(dispatch) => {
        try {
            const token = obtenerTokenStorage();

            const url = `/notificaciones/${uid}`;

            const {data} =await clientAxios.put(url, {},{
                headers : {
                    token
                }
            } )
    
            const array1 = notifications.filter(notify => notify._id !== data.model._id)

            const array = [data.model, ...array1];
            dispatch(uptatedNotifyAll(array));

        } catch (error) {
            console.log(error.response);
            
        }
       

    }

}
const setNotifIcation = (data) => ({
    type : types.notificationSet,
    payload : data
})
const uptatedNotify = (data) => ({
    type : types.notificationRemove,
    payload :data
})
const getAllNotify = (data) =>({
    type : types.notificationGetAll,

    payload: data

})
export const resetValuesNotify =() => ({
    type: types.notificationCountClear

})
const uptatedNotifyAll = (data)=> ({
    type : types.notificationUpdateAll,
    payload : data

})