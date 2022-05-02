import types from "../types"

const initialState = {
    publicacionesPrincipal : [],
    publicacionesProfile : [],
    publicacionesFriend : [],
    cargar : true,
    page: 1,
    pagination : 0,
    mostrarBoton : false,
    historyBack : false,
    cargarPrimeraVezHistory : false
    

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case types.publicacionesProfile:
        return { 
            ...state,
            publicacionesProfile :   payload,
            cargar : false,
            page : state.page + 1 
        }
    case types.publicacionesCreated:
        return {
            ...state,   
            publicacionesProfile : [payload, ...state.publicacionesProfile ] 
        }
    case types.publicacionPaginationGet:
        return {
            ...state,
            pagination : payload
        }
    case types.historyBackTrue:
        return {
            ...state,
            historyBack : true,
           
        }

    case types.historyBackFalse:
        return {
            ...state,
            cargarPrimeraVezHistory : true,
            historyBack : false,

        }
    case types.publicacionesUpdated:
        return {
            ...state,
            publicacionesProfile : payload 
        }
    case types.publicacionBtn : 
        return{
            ...state,
            mostrarBoton : true

        }
    case types.publicacionBtnOcultar : 
        return{
            ...state,
            mostrarBoton : false

    }
    
    case types.ResetearValoresPreterminados : 
        return{
            publicacionesPrincipal : [],
            publicacionesProfile : [],
            publicacionesFriend : [],
            cargar : true,
            page: 1,
            pagination : 0,
            mostrarBoton : false,
            cargarPrimeraVezHistory : false
        }

    case types.publicacionesLOading:
        return {
            ...state,
            cargar: true
        }

    default:
        return state
    }
}
