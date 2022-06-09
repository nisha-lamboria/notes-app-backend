import AuthStyles from "../styles/Auth.module.css";
import "../styles/common.css";
import { Link} from "react-router-dom";
import { useToast } from "../custom hooks/useToast";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import {useSelector,useDispatch} from "react-redux";
import { signup,reset } from "../features/authSlice"; 

const Signup = () => {
  const [authForm, setAuthForm] = useState({
  });

  const {toastBox}=useToast();

  const {name,email,password,password2}=authForm;

  const dispatch=useDispatch();

  const {user,errMessage}=useSelector(state=>state.auth);

  const onChange = (e) => {
    setAuthForm(() => ({ 
      ...authForm,
      [e.target.name]: e.target.value,
    }));
  };
  
  const authSubmit = (e) => {
    e.preventDefault();
    if(password===password2){
      dispatch(signup({name,email,password}))
    }else{
      toastBox(`passwords don't match`,'error')
    }  
  };

  useEffect(()=>{
    if(user){
      toastBox(`signed up `,'success')
    }else if(errMessage){
      toastBox(`${errMessage}`,'error')
    }
    dispatch(reset());
    // eslint-disable-next-line
  },[user,errMessage,dispatch])

  return (
    <div>
      <Header />
      <main className={`${AuthStyles["authForm-fullWrapper"]} flex-hCenter `}>
        <div className={`${AuthStyles["authForm-wrapper"]}`}>
          <p className={`${AuthStyles["auth-heading"]}`}>Signup</p>
          <form className={`flex-col`} onSubmit={authSubmit}>
            <div className={`${AuthStyles["input-wrapper"]} flex-col`}>
              <label
                htmlFor="name"
                className={`${AuthStyles["text-label"]}`} 
              >
                UserName<span className={`${AuthStyles["req-feild"]}`}>*</span>
              </label>
              <input
                name="name"
                id="name"
                type="name"
                className={`${AuthStyles["text-input"]}`}
                onChange={onChange}
              />

              <label htmlFor="email" className={`${AuthStyles["text-label"]}`}>
                Email<span className={`${AuthStyles["req-feild"]}`}>*</span>
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className={`${AuthStyles["text-input"]}`}
                onChange={onChange}
              />

              <label
                htmlFor="password"
                className={`${AuthStyles["text-label"]}`}
              >
                Password<span className={`${AuthStyles["req-feild"]}`}>*</span>
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className={`${AuthStyles["text-input"]}`}
                onChange={onChange}
              />

              <label
                htmlFor="password2"
                className={`${AuthStyles["text-label"]}`}
              >
                Confirm Password
                <span className={`${AuthStyles["req-feild"]}`}>*</span>
              </label>
              <input
                name="password2"
                id="password2"
                type="password"
                className={`${AuthStyles["text-input"]}`}
                onChange={onChange}
              />
            </div>
            <button
              className={`${AuthStyles["btn-primary"]} ${AuthStyles["login-btn"]} button flex-center`}
            >
              Sign Up
            </button>
          </form>
          <div className={`${AuthStyles["sign-link"]}`}>
            <Link to="/Login">Already have an account</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Signup };
