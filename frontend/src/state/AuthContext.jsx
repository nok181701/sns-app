import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//最初のユーザー定義
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const saveUserData = () => {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("user_timestamp", Date.now().toString());
    };

    if (state.user) {
      saveUserData();
      const intervalId = setInterval(saveUserData, 60 * 60 * 1000);
      return () => clearInterval();
    }
  }, [state.user]);

  useEffect(() => {
    const expirationTimeInMilliseconds = 2 * 60 * 60 * 1000; // 2hours
    const storedTimestamp = localStorage.getItem("user_timestamp");

    if (
      storedTimestamp &&
      Date.now() - parseInt(storedTimestamp, 10) > expirationTimeInMilliseconds
    ) {
      localStorage.removeItem("user");
      localStorage.removeItem("user_timestamp");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
