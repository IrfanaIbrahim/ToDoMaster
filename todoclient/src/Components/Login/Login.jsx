import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.css";
import AuthContext from "../../AuthContext";
import Navbar from '../Navbar/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const { setLoginDetails } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      if (username && password) {
        const response = await axios.post("http://localhost:5000/user/login", {
          username,
          password,
        });
        setLoginDetails(response.data.userWithoutPassword);
        navigate("/home");
      } else {
        Swal.fire({
          title: "Failed",
          icon: "error",
          text: "Enter Username and Password",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: error.response?.data?.message || "Server error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
  <div>
    <Navbar active="Login" />
    <div className="login-container">
      <div className="login-text">Login</div>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="password-container">
        <input
          className="login-input"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p>If you don't have an account, please create one from the registration page.</p>
    </div>
  </div>
  );
};

export default Login;
