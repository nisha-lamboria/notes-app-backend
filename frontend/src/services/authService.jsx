import axios from 'axios';

const API_ENDPOINTS='http://localhost:5000/api/users/'

export const signupService=async(user)=>{
    const response=await axios.post(`${API_ENDPOINTS}/signup`,user)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    };
    return response.data
}

export const loginService=async(user)=>{
    const response=await axios.post(`${API_ENDPOINTS}/login`,user)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    };
    return response.data
}

export const logoutService=async()=>{
    localStorage.removeItem('user');
}