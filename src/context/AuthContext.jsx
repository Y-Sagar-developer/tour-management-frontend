import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1] || null,
  loading: false,
  error: null,
  isGuest: localStorage.getItem("isGuest") === "true" || false,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
        isGuest: false,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      // Also set the token in cookie if not already set
      if (!document.cookie.includes('access_token')) {
        document.cookie = `access_token=${action.payload.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      }
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
        isGuest: false,
      };
    case "LOGIN_FAILURE":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
        isGuest: false,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        isGuest: false,
      };
    case "GUEST_LOGIN":
      const guestUser = {
        username: "Guest User",
        email: "guest@example.com",
        isGuest: true,
        _id: "guest",
      };
      localStorage.setItem("user", JSON.stringify(guestUser));
      localStorage.setItem("isGuest", "true");
      return {
        ...state,
        user: guestUser,
        token: null,
        loading: false,
        error: null,
        isGuest: true,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isGuest");
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
        isGuest: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    // Check for token in both localStorage and cookies
    const token = state.token || document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
    
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded.exp * 1000 < Date.now()) {
          // Token expired
          dispatch({ type: "LOGOUT" });
        } else {
          // If token is valid but not in localStorage, restore it
          if (!localStorage.getItem("token")) {
            localStorage.setItem("token", token);
          }
          // If user data is missing but token is valid, try to restore from localStorage
          if (!state.user && localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({ 
              type: "LOGIN_SUCCESS", 
              payload: { user, token } 
            });
          }
        }
      } catch (err) {
        console.error('Token validation error:', err);
        dispatch({ type: "LOGOUT" });
      }
    }
  }, [state.token, state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        isGuest: state.isGuest,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
