import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "./Rigester.css";

const Register = () => {

    const navigate = useNavigate();

    const [registration, setRegistration] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setRegistration({
            ...registration,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await ApiService.registerUser(registration);

            setMessage(response.message);

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
            }

            navigate("/login");

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (

        <div className="register-page">

            <div className="background-glow"></div>

            <div className="register-container">

                <div className="register-header">

                    <h1>PanScience AI</h1>

                    <p>
                        Create your intelligent AI workspace
                        for multimedia and document analysis.
                    </p>

                </div>

                <form className="register-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={registration.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={registration.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Create a strong password"
                        value={registration.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                {message && (
                    <p className="register-message">
                        {message}
                    </p>
                )}

                <div className="register-link">

                    Already have an account?{" "}

                    <Link to="/login">
                        Sign In
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default Register;