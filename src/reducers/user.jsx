import types from "../types"

const initialState = {
    message: '',
    status: false,
    errs: false,
    user:{},
    auth: false,
    msgStatus: '',
    pubProfile : {},
    pubCover : {},
    obtenerProfile : true,
    obtenerCover : true,

}

export default (state = initialState, { type, payload }) => {

  switch (type) {
      case types.authMessage:
        return{
            ...state,
            message: payload.msg,
            errs: payload.errs
        }
        case types.authStatus:
            return {
                ...state,
                status : payload
            }
        case types.authLogin:
            return{
                ...state,
                user: payload.user,
                auth: payload.auth,
            }
        case types.authProfile:
            return {
                ...state,
                user: payload
            }
            
        case types.authError:
            return{
                ...state, 
                auth: false
            }
        case types.authErrorToken:
            return{
                ...state, 
                auth: false,
                msgStatus: payload

            }
        case types.userCover:
            return {
                ...state,
                pubCover: payload,
                obtenerCover : false
            }
        case types.userProfile:
            return {
                ...state,
                pubProfile: payload,
                obtenerProfile : false

            }
        case types.userUpdatedValueProfile:
            return {
                ...state,
                obtenerProfile : true

            }
        case types.userUpdatedValueCover:
            return {
                ...state,
                obtenerCover : true
            }
        case types.userUpdatedValuesReset:
            return {
                ...state,
                pubProfile : {},
                pubCover : {},
                obtenerProfile : true,
                obtenerCover : true,

            }
    default:
        return state
    }
}
