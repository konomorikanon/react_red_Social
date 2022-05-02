import types from "../types"

const initialState = {
    notifications : [],
    countNotificationNews : 0,
    

}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.notificationSet:
      return {
        ...state,
        notifications : [...state.notifications, payload],
        countNotificationNews: state.countNotificationNews + 1

      }
    case types.notificationRemove:
      return {
        ...state,
        notifications : payload,
        countNotificationNews : (state.countNotificationNews === 0) ? 0 :  state.countNotificationNews - 1, 
      }

    case types.notificationCountClear:
      return {
        ...state,
        countNotificationNews : 0
      }
    case types.notificationGetAll:
      return {
        ...state,
        notifications : payload.models,
        countNotificationNews : payload.count
      }
    case types.notificationUpdateAll:
      return {
        ...state,
        notifications: payload
      }
    

  default:
    return state
  }
}
