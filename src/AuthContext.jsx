import { createContext, useContext, useEffect, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signUp = async (formData) => {
    const nameValue = formData.get("name");
    const response = await fetch(
      "https://fsa-jwt-practice.herokuapp.com/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: nameValue,
          password: "super-secret-999",
        }),
      }
    );
    const tokenObj = await response.json();
    const retrievedToken = tokenObj.token;
    console.log(tokenObj);
    console.log(retrievedToken);
    setToken(retrievedToken);
    setLocation("TABLET");
    sessionStorage.setItem("token", retrievedToken);
  };

  // TODO: authenticate
  const authenticate = async () => {
    if (token.length > 0) {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const x = await response.json();
      setLocation("TUNNEL");
      console.log(x);
    } else {
      throw Error("Token is not exist.");
    }
  };

  useEffect(() => {
    const tokenToStore = sessionStorage.getItem("token");
    setToken(tokenToStore);
  }, []);

  const value = { location, signUp, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
