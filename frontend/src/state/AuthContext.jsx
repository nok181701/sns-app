import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//最初のユーザー定義
const initialState = {
  // user: null,
  user: {
    _id: "657ec55aa1cbfbf43c8225a8",
    username: "にゃーん",
    email: "cat@gmail.com",
    password: "$2b$10$3Br4Lq3lFDYOQOIFfIwTeOABSkJ7H0.FQtGsQzbx6mXt6og3oMyeu",
    profilePicture: "/person/cat.jpeg",
    coverPicture: "",
    followers: [],
    followings: [],
  },
  isFetching: false,
  error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
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
