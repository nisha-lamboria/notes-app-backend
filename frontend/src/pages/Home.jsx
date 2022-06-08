import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { AddNote } from "../components/Note/AddNote";
import { Header } from "../components/Header";
import { getNotes} from "../features/notesSlice";
import { NotesList } from "../components/Note/NotesList";
import { Loader } from "../components/Loader/Loader";

const Home = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {notes,loading,errMessage}=useSelector((state)=>state.notesData);

  useEffect(() => {
    if(errMessage){
      console.log(errMessage)
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getNotes());
    // eslint-disable-next-line
  }, [user,errMessage,dispatch]);

  if(loading){
    return <Loader/>
  }

  return (<div>
    <Header/>
    <AddNote/>
    <NotesList/>
  </div>)
};

export { Home };
