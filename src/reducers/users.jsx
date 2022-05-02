import  types  from '../types'

const initialState = {
    usuarios: [],
    obtener: true,
    solicitudUser : [],
    userOnePub: {},
    solicitudOne : {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {


    case types.userList:
        return {
            ...state,
            usuarios : payload,
            obtener: false,
        } 
    case types.userGetList:
        return {
            ...state,
            obtener: true,
        }
    case types.usersGetValues:
        return {
            ...state ,
            solicitudUser : [...state.solicitudUser, payload ]
        }
    case types.usersUpdatedValues:
        return {
            ...state ,
            solicitudUser : payload
        }
    case types.usersResetValues:
        return {
            ...state ,
            solicitudUser : []
        }

    case types.userOneGet:
        return {
            ...state ,
            userOnePub : payload
        }
    case types.userOneDelete:
        return {
            ...state ,
            userOnePub : {}
        }
    case types.solicitudOne:
        return {
            ...state ,
            solicitudOne : payload
        }
    default:
        return state
    }
}
