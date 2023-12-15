import React from "react";
import "src/pages/Register/Register.css";

const Register = () => {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SNS-APP</h3>
          <span className="loginDesc">さぁはじめてみよう！</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <p className="loginMsg">新規登録はこちら</p>
            <input type="text" placeholder="Eメール" className="loginInput" />
            <input
              type="text"
              placeholder="ユーザー名"
              className="loginInput"
            />
            <input
              type="text"
              placeholder="パスワード"
              className="loginInput"
            />
            <input
              type="text"
              placeholder="確認用パスワード"
              className="loginInput"
            />
            <button className="loginButton">サインアップ</button>
            <button className="loginRegisterButton">ログイン</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
