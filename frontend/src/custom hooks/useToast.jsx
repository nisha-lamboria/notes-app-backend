import {toast} from "react-toastify";

export const useToast=()=>{
   const toastBox= (text,mode)=>{
        toast[mode](text,{
            autoClose:1500,
            position:"top-center",
            closeOnClick:true,
            draggable:true,
            newestOnTop: true,
        })
    }
    return {toastBox}
}