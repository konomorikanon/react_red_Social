import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { deleteNoficationAction, obtenerUnaNotificacionYActualizar, postNoficationAction } from "../actions/notification";
import {  aceptarSolicitud, obtenerUnaSolicitudYActualizar, resetearSolicitudes } from "../actions/solicitud";
import { obtenerListadoAmigos } from "../actions/usuarios";
let socket;

export const conectar = (dispatch, usuarios , notifications, solicitudUser ) => {
    socket = io("http://localhost:8081", { transports : ['websocket'] });


    socket.on('connect', () => {
        console.log(socket.sessionid, 12);

    } )
 
    socket.on('usuario-nuevo', () => {
        
        dispatch(obtenerListadoAmigos())
        dispatch(resetearSolicitudes())
    
    }  )

    socket.on('solicitud-enviada', (valor) => {

 
        // silicitudes aqui no toques
        console.log(valor, 28);

        dispatch(obtenerUnaSolicitudYActualizar(`/solicitud/solicitud/${valor.solicitudid}`, usuarios ))
        // verificarActionNotification

        switch (valor.rol) {
            case "SOLICITUD":
                
            
                dispatch(obtenerUnaNotificacionYActualizar(`/notificaciones/${valor.uid}`, notifications))
                
                break;
            case "SOLICITUD_REMOVE":
               
                dispatch(deleteNoficationAction(notifications, valor.uid ))       
                

                break;

            default:
                break;
        }


    } )

    socket.on('solicitud-aceptada', (values) => {
        console.log(values, 55);
        
        dispatch(aceptarSolicitud(values.id, solicitudUser))
    
    }  )
    socket.on('solicitud-rechazada', (values) => {
        console.log(values, 61);
        
        dispatch(obtenerUnaSolicitudYActualizar(`/solicitud/solicitud/${values.id}`, solicitudUser))
    
    }  )
}

export const usuarioConectado = (id, name) => {
   
    const data = {
        idUser : id,
        name,
        msg : "mensaje",
    }
    console.log("");
    socket.emit('usuario-conectado', data , (valor) => {
        console.log(valor);

    } )
}

export const usuarioNuevo = (id) => {
  
    console.log(id);

    socket.emit('usuario-nuevo', {id} , (valor) => {
        console.log(valor);

    } )
}

export const SolicitudUser = (values) => {
    // el tercer agumento solo lo recibe nuestro amigo
    console.log(values, 88);
    socket.emit('solicitud-enviada' , values, (valor) => {
        console.log(55);
    } )

}

export const SolicitudAccept = (values) => {
    // el tercer agumento solo lo recibe nuestro amigo
    socket.emit('solicitud-aceptada' , values, (valor) => {
        console.log(89);
    } )

}

export const SolicitudRechazed = (values) => {
    // el tercer agumento solo lo recibe nuestro amigo
    socket.emit('solicitud-rechazada' , values, (valor) => {
        console.log(89);
    } )

}