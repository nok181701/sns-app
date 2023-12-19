import "src/pages/Register/Register.css";
import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        await axios.post("auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const GoToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SNS-APP</h3>
          <span className="loginDesc">さぁはじめてみよう！</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <p className="loginMsg">新規登録はこちら</p>
            <input
              type="text"
              placeholder="ユーザー名"
              className="loginInput"
              required
              autoComplete="username"
              ref={username}
            />
            <input
              type="email"
              placeholder="Eメール"
              className="loginInput"
              required
              autoComplete="username"
              ref={email}
            />
            <input
              type="password"
              placeholder="パスワード"
              className="loginInput"
              required
              minLength="6"
              autoComplete="current-password"
              ref={password}
            />
            <input
              type="password"
              placeholder="確認用パスワード"
              className="loginInput"
              required
              autoComplete="current-password"
              ref={passwordConfirmation}
            />
            <button className="loginButton" type="submit">
              サインアップ
            </button>
            <button
              className="loginRegisterButton"
              type="button"
              onClick={GoToLoginPage}
            >
              ログインの方はこちらへ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
