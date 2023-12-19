import React, { useContext, useRef } from "react";
import { loginCall } from "src/actionCalls";
import "src/pages/Login/Login.css";
import { AuthContext } from "src/state/AuthContext";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
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
            <p className="loginMsg">ログインはこちら</p>
            <input
              type="email"
              placeholder="Eメール"
              className="loginInput"
              required
              ref={email}
              autoComplete="username"
            />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="パスワード"
              className="loginInput"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button className="loginRegisterButton">アカウント作成</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
