import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast=()=>{
    return(
        <ToastContainer
        autoClose={1500}
        position="top-center"
        closeOnClick={true}
        draggable
        newestOnTop
        />
    )
}