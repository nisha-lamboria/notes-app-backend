import AuthStyles from "../styles/Auth.module.css";
import "../styles/common.css";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useState } from "react";

const Signup = () => {
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
          <p className={`${AuthStyles["auth-heading"]}`}>Signup</p>
          <form className={`flex-col`} onSubmit={authSubmit}>
            <div className={`${AuthStyles["input-wrapper"]} flex-col`}>
              <label
                htmlFor="username"
                className={`${AuthStyles["text-label"]}`}
              >
                UserName<span className={`${AuthStyles["req-feild"]}`}>*</span>
              </label>
              <input
                name="userName"
                id="username"
                type="text"
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
