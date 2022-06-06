import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService, logoutService, signupService } from "../services/authService";

const initialState={
    user:JSON.parse(localStorage.getItem("user"))||null,
    loading:false,
    errMessage:"",
}

export const signup=createAsyncThunk('auth/signup',
async(user,thunkAPI)=>{
    try{
        const userDetails= await signupService(user);
        return userDetails;
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
}
)

export const login=createAsyncThunk('auth/login',async(user,thunkAPI)=>{
    try{
        return await loginService(user)
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const logout=createAsyncThunk('auth/logout',async()=>{
    await logoutService();
})

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:(state)=>{
            state.loading=false
            state.errMessage=""
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(signup.pending,(state)=>{
            state.loading=true
        })
        .addCase(signup.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(signup.rejected,(state,action)=>{
            state.loading=false
            state.user=null
            state.errMessage=action.payload
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.user=null
            state.errMessage=action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
        })
    }
    
})

export default authSlice.reducer

export const {reset}=authSlice.actions
   