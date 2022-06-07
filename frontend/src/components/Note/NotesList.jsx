import { useSelector,useDispatch } from "react-redux";
import NoteStyles from "./Note.module.css";
import {removeNote} from "../../features/notesSlice";


const NotesList = () => {
    const dispatch=useDispatch();
    const {notes}=useSelector((state)=>state.notesData);

    const deleteNote=(noteId)=>{
        dispatch(removeNote(noteId));
    }

  return (
    <div className={`${NoteStyles["notes-list-wrapper"]}`}>
        {notes.map(noteObj=>
        <div key={noteObj._id} className={`${NoteStyles["saved-note"]}`}>
            <h3 className={`${NoteStyles["note-title"]}`}>{noteObj.noteTitle}</h3>
            <p className={`${NoteStyles["note-text"]}`}>{noteObj.note}</p>
            <button className={`${NoteStyles["note-delete"]}`} onClick={()=>deleteNote(noteObj._id)}>X</button>
        </div>
        )}
    </div>
  )
}

export {NotesList};