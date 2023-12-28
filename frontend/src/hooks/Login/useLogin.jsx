import { useContext, useRef } from "react";
import { loginCall } from "src/actionCalls";
import { AuthContext } from "src/state/AuthContext";

const useLogin = () => {
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
  return { email, password, dispatch, handleSubmit };
};
export default useLogin;
