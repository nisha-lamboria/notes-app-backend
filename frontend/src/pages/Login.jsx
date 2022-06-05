import AuthStyles from "../styles/Auth.module.css";
import "../styles/common.css";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useState } from "react";

const Login = () => {
  const [authForm, setAuthForm] = useState({});

  const onChange = (e) => {
    setAuthForm(() => ({
      ...authForm,
      [e.target.name]: e.target.value,
    }));
  };
  const authSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Header />
      <main className={`${AuthStyles["authForm-fullWrapper"]} flex-hCenter `}>
        <div className={`${AuthStyles["authForm-wrapper"]}`}>
          <p className={`${AuthStyles["auth-heading"]}`}>Login</p>
          <form className={`flex-col`} onSubmit={(e) => authSubmit(e)}>
            <div className={`${AuthStyles["input-wrapper"]} flex-col`}>
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

              <label for="password" className={`${AuthStyles["text-label"]}`}>
                Password<span className={`${AuthStyles["req-feild"]}`}>*</span>
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className={`${AuthStyles["text-input"]}`}
                onChange={onChange}
              />
            </div>
            <button
              className={`${AuthStyles["btn-primary"]} ${AuthStyles["login-btn"]} button flex-center`}
            >
              Sign In
            </button>
          </form>
          {/* <button className={`${AuthStyles["btn-primary"]} ${AuthStyles["test-btn"]} button`} onClick={guestLogin}>Guest Login</button> */}
          <div className={`${AuthStyles["sign-link"]}`}>
            <Link to="/Signup">Create New Account</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Login };
