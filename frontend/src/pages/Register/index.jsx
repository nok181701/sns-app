import React from "react";
import useRegister from "src/hooks/Register/useRegister";
import "src/pages/Register/Register.css";

const Register = () => {
  const {
    username,
    email,
    password,
    passwordConfirmation,
    handleSubmit,
    GoToLoginPage,
  } = useRegister();

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
