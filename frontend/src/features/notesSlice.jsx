import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNoteService, getNotesService, removeNoteService,updateNoteService } from "../services/notesService";

const initialState={
    notes:[],
    loading:false,
    errMessage:"",
    success:false,
}

export const createNote=createAsyncThunk("/notes/createNote",async(note,thunkAPI)=>{
    // console.log(note)
    try{
        const token=thunkAPI.getState().auth.user.token
        return await createNoteService(note,token)
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const getNotes=createAsyncThunk("/notes/getNotes",async(_,thunkAPI)=>{
    // console.log("thunk",thunkAPI)
    try{
        const token=thunkAPI.getState().auth.user.token
        return await getNotesService(token)
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const removeNote=createAsyncThunk("/notes/removeNote",async(noteId,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
        return await removeNoteService(noteId,token)
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const updateNote=createAsyncThunk("/notes/updateNote",async({noteId,newNote},thunkAPI)=>{
    console.log("thunk",thunkAPI,newNote,noteId)
    console.log(noteId)
    try{
        const token=thunkAPI.getState().auth.user.token
        console.log(token)
        const newNoteDetails= await updateNoteService(noteId,token,newNote)
        console.log(newNoteDetails);
        return newNoteDetails 
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const notesDataSlice=createSlice({
    name:"notesData",
    initialState,
    reducers:{
        reset:(state)=>{
            state.loading=false
            state.errMessage=""
            state.notes=[]
            state.success=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createNote.pending,(state)=>{
            state.loading=true
        })
        .addCase(createNote.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.notes.push(action.payload)
        })
        .addCase(createNote.rejected,(state,action)=>{
            state.loading=false
            state.errMessage=action.payload
        })
        .addCase(getNotes.pending,(state)=>{
            state.loading=true
        })
        .addCase(getNotes.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.notes=action.payload
        })
        .addCase(getNotes.rejected,(state,action)=>{
            state.loading=false
            state.errMessage=action.payload
        })
        .addCase(removeNote.pending,(state)=>{
            state.loading=true
        })
        .addCase(removeNote.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.notes=state.notes.filter(note=>note._id!==action.payload.id)
        })
        .addCase(removeNote.rejected,(state,action)=>{
            state.loading=false
            state.errMessage=action.payload
        })
        .addCase(updateNote.pending,(state)=>{
            state.loading=true
        })
        .addCase(updateNote.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.notes=state.notes.map(note=>note._id===action.payload._id?note=action.payload:note)
        })
        .addCase(updateNote.rejected,(state,action)=>{
            state.loading=false
            state.errMessage=action.payload
        })
    }
})

export const {reset}=notesDataSlice.actions
export default notesDataSlice.reducer