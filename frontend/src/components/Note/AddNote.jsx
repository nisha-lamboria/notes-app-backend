import {useState} from "react";
import { createNote } from "../../features/notesSlice";
import NoteStyles from "./Note.module.css";
import {useDispatch} from "react-redux";

const AddNote = () => {
    const [fullNote,setFullNote]=useState({
      noteTitle:"",
      note:"",
    });
    const {noteTitle,note}=fullNote;

    const dispatch=useDispatch();
    
    const addNoteTitle=(e)=>{
      setFullNote(()=>({...fullNote,noteTitle:e.target.value}))
    };
    const addNote=(e)=>{
      setFullNote(()=>({...fullNote,note:e.target.value}))
    };

    const saveNote=(e)=>{
      e.preventDefault();
      dispatch(createNote(fullNote));
    };

  return (
    <form className={`${NoteStyles["note-wrapper"]}`} onSubmit={saveNote}>
      <input type="text" value={noteTitle} onChange={addNoteTitle} placeholder="Add Note Title" className={`${NoteStyles["note-input"]}`}></input>
        <textarea
        rows='8'
        cols='7'
        placeholder="Add your note here"
        value={note}
        onChange={addNote}
        className={`${NoteStyles["note-body"]}`}
        >
        </textarea>
        <button type="submit" className={`${NoteStyles["save-note"]}`}>Save Note</button>
    </form>
  )
}

export {AddNote}