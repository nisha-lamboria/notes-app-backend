import { useSelector,useDispatch } from "react-redux";
import NoteStyles from "./Note.module.css";
import {removeNote} from "../../features/notesSlice";
import {useState} from "react";
import { ModalNote } from "./ModalNote";


const NotesList = () => {
    const dispatch=useDispatch(); 
    const {notes}=useSelector((state)=>state.notesData);
    const [showModal,setShowModal]=useState(false);
    const [currentNote,setcurrentNote]=useState({});


    const deleteNote=(noteId)=>{
        dispatch(removeNote(noteId));
    }

    const setModal=(noteObj)=>{
        setShowModal(true);
        const noteFound=notes.find(note=>note._id===noteObj._id)
        setcurrentNote(()=>noteFound)
    }

  return (
    <div className={`${NoteStyles["notes-list-wrapper"]}`}>
        {notes.map(noteObj=>
        <div key={noteObj._id} className={`${NoteStyles["saved-note"]}`}>
            <h3 className={`${NoteStyles["note-title"]}`}>{noteObj.noteTitle}</h3>
            <p className={`${NoteStyles["note-text"]}`}>{noteObj.note}</p>
            <p className={`${NoteStyles["note-time"]}`}>{new Date(noteObj.createdAt).toLocaleString('en-US')}</p>
            <button className={`${NoteStyles["note-delete-btn"]}`} onClick={()=>deleteNote(noteObj._id)}>X</button>
            <button className={`${NoteStyles["note-edit-btn"]}`} onClick={()=>setModal(noteObj)}>Edit</button>
            {showModal && <ModalNote noteObj={currentNote} setShowModal={setShowModal}/>}
        </div>
        )}
    </div>
  )
}

export {NotesList};