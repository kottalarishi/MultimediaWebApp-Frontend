import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await ApiService.loginUser(loginDetails);

            localStorage.setItem("token", response.data.token);

            setMessage(response.message);

            navigate("/dashboard");

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div className="login-page">

            <div className="background-overlay"></div>

            <div className="login-container">

                <div className="login-header">

                    <h1>PanScience AI</h1>

                    <p>
                        Intelligent Document & Multimedia
                        Question Answering Platform
                    </p>

                </div>

                <form className="login-form" onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={loginDetails.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={loginDetails.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                {message && (
                    <p className="login-message">{message}</p>
                )}

                <p className="login-link">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>

            </div>

        </div>
    );
};

export default Login;