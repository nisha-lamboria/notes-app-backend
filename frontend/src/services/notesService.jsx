import axios from 'axios';

const API_ENDPOINTS='http://localhost:5000/api';

export const createNoteService=async(fullNoteObj,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(`${API_ENDPOINTS}/notes`,fullNoteObj,config);
    return response.data.message;
}

export const getNotesService=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(`${API_ENDPOINTS}/notes`,config);
    return response.data;
}

export const removeNoteService=async(noteId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(`${API_ENDPOINTS}/notes/${noteId}`,config);
    return response.data;
}