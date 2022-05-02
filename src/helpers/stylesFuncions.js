export const message = (err, opt = {}) => {

    if (err) {
        return `alert alert-danger  text-lowercase`
    }else{

        return `alert alert-success text-lowercase `

    }

}

export const reactionFuc = (react) => {

    if(react) {
        return "btn publicaciones_react align-items-center w-100 text-primary"
    }else{
        return "btn publicaciones_react align-items-center w-100 "

    }
}

export const notifyFunc = (bool) => {
    if(!bool){
        return `p-3 notification_body notification_active`
    }else{
        return `p-3 notification_body bg-white`
    }
}