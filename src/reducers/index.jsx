import { combineReducers } from "redux";
import publicacionesReducer from "./publicaciones";
import useReaction from "./reaction";
import userReducer from './user'
import usersReducer from './users'
import notificationsReducer from './notification'

export default combineReducers({

    publicaciones: publicacionesReducer,
    user: userReducer,
    users: usersReducer,
    reaction: useReaction,
    notification : notificationsReducer,
    
})
