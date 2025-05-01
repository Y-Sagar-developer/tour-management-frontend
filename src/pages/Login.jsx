import React, { useState, useContext } from "react";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup, Button, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "./../utils/config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setError(""); // Clear error when user types
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      console.log('Login response:', result);

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      if (!result.success) {
        throw new Error(result.message || "Login failed");
      }

      // Get token from response data
      const token = result.data?.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(result.data));
      
      dispatch({ 
        type: "LOGIN_SUCCESS", 
        payload: {
          user: result.data,
          token: token
        }
      });
      
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      navigate("/");
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      toast.error(err.message || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    dispatch({ type: "GUEST_LOGIN" });
    navigate("/");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={loginImg} alt="Login Visual" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login</h2>
                
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="password-input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                    <span
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </span>
                  </FormGroup>
                  <Button 
                    className="btn secondary_btn auth_btn" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Form>
                <p>Don't have an account? <Link to="/register">Create an account</Link></p>
                <div className="guest_login">
                  <p>Or continue as</p>
                  <Button
                    className="btn primary_btn"
                    onClick={handleGuestLogin}
                  >
                    Guest User
                  </Button>
                </div>
                {error && <Alert color="danger">{error}</Alert>}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
