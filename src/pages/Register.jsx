import React, { useState, useContext } from "react";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup, Button, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "./../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError(""); // Clear error when user types
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    if (!credentials.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!credentials.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!credentials.password) {
      setError("Password is required");
      return false;
    }
    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting to connect to:', `${BASE_URL}/auth/test`);
      
      // Test server connection with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const testResponse = await fetch(`${BASE_URL}/auth/test`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!testResponse.ok) {
        throw new Error(`Server responded with status: ${testResponse.status}`);
      }

      // If test connection successful, proceed with registration
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setSuccess("Registration successful! Please login.");
      dispatch({ type: "REGISTER_SUCCESS" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestRegister = () => {
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
                <img src={registerImg} alt="" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      id="username"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="password-input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
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
                  <Button className="btn secondary_btn auth_btn" type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </Form>
                <p>Already have an account?<Link to='/login'>Login</Link></p>
                <div className="guest_register">
                  <p>Or continue as</p>
                  <Button
                    className="btn primary_btn"
                    onClick={handleGuestRegister}
                  >
                    Guest User
                  </Button>
                </div>
                {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
