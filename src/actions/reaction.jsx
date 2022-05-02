import { obtenerTokenStorage } from "../helpers/obtenerTokenls";
import types from "../types";
import clientAxios from "../urls/urlClient"

export const obtenerCantidadReactionPub = (id) => {
    return async(dispatch) => {

        try {
            const token = obtenerTokenStorage();
            const {data} = await clientAxios.get(`/publication/reactPub/${id}`, {
                headers : {
                    token
                }
            });

            console.log(data, id)
            dispatch(obtenerReaction({
                id,
                reactions : data.counter,
             } ))   
        } catch (error) {
            
        }
    }

}

const obtenerReaction = (data) => ({
    type : types.reactmostrarPubs,
    payload : data


})