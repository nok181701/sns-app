import React from "react";
import useLogin from "src/hooks/Login/useLogin";
import "src/pages/Login/Login.css";

const Login = () => {
  const { email, password, handleSubmit } = useLogin();

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
