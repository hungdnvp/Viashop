import axios from "./axios"

const handleLoginApi = (email,password)=>{
    let result = axios.post('/api/login',{email,password});
    if(result.errCode === 0){
        //set JWT token to local
        localStorage.setItem("token", result.token);
        axios =  axios.setAuthToken(result.token)
    }
    return result;
}
const handleRegisterApi = (inputData) =>{
    return axios.post('/api/register',inputData)
}

export {
    handleLoginApi,
    handleRegisterApi,
}