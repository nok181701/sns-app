import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useRegister = () => {
  const apiUrl =
    process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_ENDPOINT_DEV;
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
        await axios.post(`${apiUrl}/auth/register`, user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const GoToLoginPage = () => {
    navigate("/login");
  };
  return {
    username,
    email,
    password,
    passwordConfirmation,
    navigate,
    handleSubmit,
    GoToLoginPage,
  };
};

export default useRegister;
