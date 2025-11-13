import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import netflix_spinner from "../../assets/netflix_spinner.gif"

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorState,setErrorState] = useState("");
  const[loading,setloading] = useState(false)

  const navigate = useNavigate();

  function handleSignIn() {
    setSignState("Sign In");
  }

  function handleSignUp() {
    setSignState("Sign Up");
  }

  const user_auth = async () => {
    try {
      if (signState === "Sign In") {
        setloading(true)
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigate("/");
        setloading(false)
      } else {
        setloading(false);
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("User signed up:", userCred.user);
        toast.success("Account created successfully! Please sign in.");
        setSignState("Sign In");
        setEmail("");
        setPassword("");
        setUsername("");
        
      }
    } catch (error) {
      setloading(false);
      console.error("Auth error:", error.message);

      if (email === "") {
        toast.error("Email is required");
      } else if (password === "") {
        toast.error("Password is required");
      } else if (email === "" && password === "") {
        toast.error("Please enter details");
      } else {
        
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("This email is already registered");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email format");
            break;
          case "auth/weak-password":
            toast.error("Password should be at least 6 characters");
            break;
          case "auth/user-not-found":
            toast.error("No account found with this email");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password");
            break;
          default:
            toast.error("Invalid credential");
        }
      }
      
    }
  };

  return (
    loading?
  <div className="spinner-container">
    <img src={netflix_spinner} alt="Loading..." className="spinner" />
  </div>:

    <div className="login">

      <img src={logo} alt="Netflix Logo" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            user_auth();
          }}
        >
          {signState === "Sign Up" && (
            <input
              type="text"
              name="username"
              placeholder="Your name"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setErrorState("")}}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => {setPassword(e.target.value);setErrorState("")}}
          />
          <button className="sign-btn" type="submit">
            {signState === "Sign Up" ? "Sign Up" : "Sign In"}
          </button>
          <p className="error">{errorState}</p>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="remem" />
              <label htmlFor="remem">Remember Me</label>
            </div>
            <p className="help" >Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={handleSignIn}>Sign In</span>
            </p>
          ) : (
            <p>
              New to Netflix? <span onClick={handleSignUp}>Sign Up Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
