import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./App.css";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("Creating account...");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (data.success) {
                setMessage("Account created successfully!");

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    password: ""
                });
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.error(error);
            setMessage("Unable to connect to server");
        }
    };

    // Temporary URL for testing
   const signupUrl = window.location.origin;

    return (
        <div className="container">

            <div className="form-card">

                <h1>Create Account</h1>

                <p className="subtitle">
                    Sign up to get started
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone</label>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                {message && (
                    <p className="message">
                        {message}
                    </p>
                )}

            </div>

            <div className="qr-card">

                <h2>Scan to Sign Up</h2>

                <QRCodeSVG
                    value={signupUrl}
                    size={220}
                />

                <p>
                    Scan this QR code with your phone
                </p>

            </div>

        </div>
    );
}

export default App;