import { obtenerTokenStorage } from "../helpers/obtenerTokenls";
import types from "../types";
import clientAxios from "../urls/urlClient";

export const PostPub = (values, File, typePub, url, disp ) => {

    return async(dispatch) => {
        try {
            console.log(values, File, typePub);
            const token  = obtenerTokenStorage()

            var bodyFormData = new FormData();
            bodyFormData.append('archivo', File); 
            bodyFormData.append('typePub', typePub);        
            bodyFormData.append('description', values.descripcion); 


            const api = await  clientAxios.post(url, bodyFormData,
                {
                    headers : {
                        token,
                        "Content-Type": "multipart/form-data"
                    }
                })

            switch (disp) {
                case "profile":

                    dispatch(profileValues(api.data.model))
                    dispatch(actualizarProfileData())
                    break;
            
                case  "cover":
                    dispatch(actualizarCoverData())

                default:
                    break;
            }

            dispatch(cargarPublicaciones(api.data.pub))
   
        } catch (error) {
            console.log(error.response);   

            
        }
    }
    
}

// obtener el perfil del usuario

export const obtenerPerfil = () => {
    return async(dispatch) => {

        try {
            const token  = obtenerTokenStorage()
            const {data} =await clientAxios.get('/auth/profile', {
                headers: {
                    token
                }
            });

            dispatch(obtenerProfileData(data.model))
        } catch (error) {
            console.log(error.response);
            
        }
      

    }
}

export const obtenerPerfilId = (id) => {
    return async(dispatch) => {

        try {
            const token  = obtenerTokenStorage()
            const {data} =await clientAxios.get(`/auth/profile/${id}`, {
                headers: {
                    token
                }
            });
            console.log(data);

            dispatch(obtenerProfileData(data.model))
        } catch (error) {
            console.log(error.response);
            
        }
      

    }
}
const obtenerProfileData = (model) => ({
    type: types.userProfile,
    payload : model

})

export const obtenerCoverAction = () => {
    return async(dispatch) => {

        try {
            const token  = obtenerTokenStorage()
            const {data} =await clientAxios.get('/auth/cover', {
                headers: {
                    token
                }
            });
            console.log("desde cover");

            dispatch(obtenerCoverData(data.model))
        } catch (error) {
            console.log(error.response);
            
        }
      

    }
}
export const obtenerCoverActionId = (id) => {
    return async(dispatch) => {

        try {
            const token  = obtenerTokenStorage()
            const {data} =await clientAxios.get(`/auth/cover/${id}`, {
                headers: {
                    token
                }
            });
            console.log("desde cover");

            dispatch(obtenerCoverData(data.model))
        } catch (error) {
            console.log(error.response);
            
        }
      

    }
}

const obtenerCoverData = (model) => ({
    type: types.userCover,
    payload : model

})

// resetear valores cover y profile
const actualizarCoverData = () => ({
    type: types.userUpdatedValueCover,

})

const actualizarProfileData = () => ({
    type: types.userUpdatedValueProfile,

})
// postear valores en solo escritura


export const textPub = (description , url) => {
    return async(dispatch) => {
        console.log({description});

        try {
            const token  = obtenerTokenStorage()

            const {data} = await  clientAxios.post(url, {description},
                {
                    headers : {
                       token,
                }
            })
            

            console.log(data.pub);
            dispatch(cargarPublicaciones(data.pub))

        } catch (error) {
            console.log(error.response);
            
        }

    }


}


export const textPubUpdated = (description , url, publications) => {
    return async(dispatch) => {

        try {
            const token  = obtenerTokenStorage()

            const {data} = await  clientAxios.put(url, {description},
                {
                    headers : {
                       token,
                }
            })
            const updated = publications.filter(value => value.uid !== data.pub.uid )

            console.log(updated);
            const api2 = [ data.pub, ...updated ]
            // console.log(api);

            dispatch(updatedPub(api2))

        } catch (error) {
            console.log(error.response);
            
        }

    }


}

const profileValues = (data) => ({
    type: types.authProfile,
    payload : data

    


})


// actualizar publicaciones 
export const  putPub =  (values, File, typePub, url, disp, valuesDates ) => {
    return async(dispatch) => {

        try {
            const token  = obtenerTokenStorage()

            var bodyFormData = new FormData();
            bodyFormData.append('archivo', File); 
            bodyFormData.append('typePub', typePub);        
            bodyFormData.append('description', values.descripcion); 


            const {data} = await  clientAxios.put(url, bodyFormData,
                {
                    headers : {
                        token,
                    }
                })

            const updated = valuesDates.filter(value => value.uid !== data.pub.uid )
            console.log(updated);
            const api2 = [ data.pub, ...updated]


            dispatch(updatedPub(api2))
            
        } catch (error) {
            console.log(error.response);   

            
        }
    }
}

export const deletePub = ( url, pubs) => {

    return async(dispatch) => {

        try {
            const token = obtenerTokenStorage();

            const {data} = await  clientAxios.delete(url, {
                headers : {
                    token
                }
            })

            console.log(data, pubs );
            if(data.model){
                dispatch(profileValues(data.model))
                
                dispatch(actualizarProfileData())
                
            }
            

            console.log(pubs);
            dispatch(updatedPub(pubs))
            


        } catch (error) {
            console.log(error.response);
            
        }


    }
}






export const publicacionesProfileGetId = (publicaciones, page, pagination, id = "" ) => {
    return async(dispatch)  => {
        try {
            const token = obtenerTokenStorage();
         
            const {data} = await  clientAxios.get(`/publication/profile/${id}?limit=5&page=${page}`, {
                headers : {
                    token
                }
            }) 
            if(publicaciones.length){
                if (data.model.length > 0) {

                    var publicaciones1 = publicaciones

                    data.model.map(dat => {
                        publicaciones1.push(dat)

                    })

                    dispatch(obtenerPublicacionesProfile(publicaciones1))   
                }
            }else{

                dispatch(obtenerPublicacionesProfile(data.model))
            }
            if(page >= pagination ){

                dispatch(ocultarBtn())
            }
        } catch (error) {
            console.log(error.response);   
        }
    }
}

// traer las publicaciones del la persona

export const publicacionesProfileGet = (publicaciones, page, pagination, id = "" ) => {
    return async(dispatch)  => {
        try {
            const token = obtenerTokenStorage();
         
                const {data} = await  clientAxios.get(`/publication/profile?limit=5&page=${page}`, {
                    headers : {
                        token
                    }
                })
            if(publicaciones.length){
                if (data.model.length > 0) {

                    var publicaciones1 = publicaciones

                    data.model.map(dat => {
                        publicaciones1.push(dat)

                    })

                    dispatch(obtenerPublicacionesProfile(publicaciones1))   
                }
            }else{

                dispatch(obtenerPublicacionesProfile(data.model))
            }
            if(page >= pagination ){

                dispatch(ocultarBtn())
            }
            dispatch(historyFalse())
        } catch (error) {
            console.log(error.response);   
        }
    }
}

const obtenerPublicacionesProfile = (data) =>({
    type: types.publicacionesProfile,
    payload: data


})

const ocultarBtn = () => ({
    type: types.publicacionBtnOcultar
})
// obtenerPrimeros5

const cargarPublicaciones = (pub) => ({
    type : types.publicacionesCreated,
    payload : pub


})
const updatedPub = (pub) => ({
    type : types.publicacionesUpdated,
    payload : pub

})



// react

export const setReactPub = (id,reactionPub, publicaciones ) => {

    return async(dispatch) => {
        try {
            const token = obtenerTokenStorage();

            const {data} = await  clientAxios.get(`/publication/reaction/${id}`, {
                headers : {
                    token
                }
            })
            console.log(data.model._id, reactionPub);

            const array = reactionPub.filter(react => react._id != data.model._id )
            const array1  = [...array, data.model]

            const updated = publicaciones.filter(value => value.uid !== data.pub.uid )
            console.log(updated);
            const api2 = [ data.pub, ...updated]


            dispatch(updatedPub(api2))
            dispatch(reactUpdated({array1 , id : data.model._id}))
            
        } catch (error) {
            
        }

    }

}
export const deleteReaction = (value, valores) => {
    return async(dispatch) => {

        const array1 = valores.filter(react => react._id !== value._id )

        console.log( array1, value );

        dispatch(reactUpdated({array1 , id :  value._id}))
        
        
    }
}


const reactUpdated = (model) => ({
    type : types.reactValuesUpdated,
    payload : model

})

// const obtenerReaccion

export const obtenerReaccionPubID = (id) => {
    
    return async(dispatch) => {
        try {
            const token = obtenerTokenStorage();

            const {data} = await  clientAxios.get(`/publication/react/${id}`, {
                headers : {
                    token
                }
            })
            dispatch(reactget(data.model))
            
        } catch (error) {
            
        }

    }

}

const reactget = (model) => ({
    type : types.reactValues,
    payload : model

})

// restablecer valores preterminados

export const reiniciarValores = () => {

    return async(dispatch) => {

        dispatch(resetearReact());
        dispatch(resetearPub());

    }
}
export const reiniciarValoresProfile = () => {

    return async(dispatch) => {

        dispatch(resetearProfile());

    }
}

export const resetearValoresReaction = () => {
    return async(dispatch) => {

        dispatch(resetearReact());
    }
}

export const historyTrueAction = () => {
    return async(dispatch) => {

        dispatch(historyTrue());
    }
}
const resetearPub = () =>({
    type : types.ResetearValoresPreterminados
})

const resetearReact = () =>({
    type : types.reactValuesReset
})
const resetearProfile = () =>({
    type : types.userUpdatedValuesReset
})

const historyTrue = () =>({
    type : types.historyBackTrue
})

const historyFalse = () =>({
    type : types.historyBackFalse
})