import axios from "axios";

const clientAxios = axios.create({
    baseURL: 'https://red-social-node1.herokuapp.com/api' 
})

export default clientAxios