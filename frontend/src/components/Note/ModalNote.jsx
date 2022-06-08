import NoteStyles from "./Note.module.css";
import { useState} from "react";
import { updateNote } from "../../features/notesSlice";
import {useDispatch} from "react-redux";

const ModalNote = ({ noteObj,setShowModal}) => {
    // console.log(noteObj)
  const [newNote,setNewNote]=useState({
      noteTitle:noteObj.noteTitle,
      note:noteObj.note
  })

  const dispatch=useDispatch();

  const editNote=(e,noteId)=>{
    // console.log(newNote)
    e.preventDefault();
    dispatch(updateNote(noteId,newNote))
  }

  return (
    <div className={`${NoteStyles["modal-note"]}`}>
      <form
        className={`${NoteStyles["note-wrapper"]}`}
        onSubmit={(e) => editNote(e,noteObj._id)}
      >
        <input
          type="text"
          value={newNote.noteTitle}
          onChange={(e)=>setNewNote(()=>({...newNote,noteTitle:e.target.value}))}
          className={`${NoteStyles["note-input"]}`}
        ></input>
        <textarea
          rows="8"
          cols="7"
          value={newNote.note}
          onChange={(e)=>setNewNote(()=>({...newNote,note:e.target.value}))}
          className={`${NoteStyles["note-body"]}`}
        ></textarea>
        <button type="submit" className={`${NoteStyles["save-note-btn"]}`}>
          Update Note
        </button>
      </form>
      <button className={`${NoteStyles["note-delete-btn"]}`} onClick={()=>setShowModal(false)}>X</button>
    </div>
  );
};

export { ModalNote };
