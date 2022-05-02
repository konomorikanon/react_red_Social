import types from "../types"

const initialState = {
    reactionPub : [],
    numbersPub : [],
    valuesId : {
      id: "",
    },
    obtenerValores : true

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case types.reactValues:

    return { 
        ...state,
        reactionPub: [...state.reactionPub, payload]

     }
  case types.reactValuesReset:
    return {
      reactionPub : [],
      numbersPub : [],
      valuesId : {
        id: "",
      },
      obtenerValores : true
    }
  
  case types.reactmostrarPubs:

    return { 
        ...state,
        numbersPub: [...state.numbersPub, payload]

  }
  case types.reactValuesReset:

    return { 
        ...state,
        reactionPub: [],
        obtenerValores : true

    }
    case types.reactValuesUpdated:

      return { 
          ...state,
          reactionPub : payload.array1,
          valuesId : {
            id : payload.id
          }
          
  
        }
  default:
    return state
  }
}
