import { obtenerTokenStorage } from "../helpers/obtenerTokenls"
import types from "../types"
import clientAxios from "../urls/urlClient"

export const obtenerPaginacionGet = (number = 5) => {

    return async(dispatch) => {
        const token = obtenerTokenStorage()

        const {data} = await clientAxios.get('/publication/paginationProfile',{
            headers : {
                token  
            }
        })

        const pagination = Math.ceil(Number(data.pagination/number ))
        console.log(data.pagination, number);

        dispatch(obtenerPaginacionValues(pagination))
        if(pagination > 1){
            dispatch(activarBtn());
        }


    }
}

const obtenerPaginacionValues = (data) =>({
    type : types.publicacionPaginationGet,
    payload: data,

})
const activarBtn  = () => ({
    type : types.publicacionBtn,
    
})