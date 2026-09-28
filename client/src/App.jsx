import { useState } from "react";
import "./App.css";

function App() {
    const [formData, setFormData] = useState({
        f_name: "",
        l_name: "",
        username: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Update the matching form field
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    // Send signup information to the backend
    async function handleSignup(event) {
        event.preventDefault();
        setMessage("");
        setIsError(false);

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            setMessage(data.message);
            setIsError(!response.ok);

            if (response.ok) {
                setFormData({
                    f_name: "",
                    l_name: "",
                    username: "",
                    password: ""
                });
            }
        } catch (error) {
            console.error("Signup request failed:", error);
            setMessage("Could not connect to the server.");
            setIsError(true);
        }
    }

    return (
        <main>
            <section>
                <h1>Create Account</h1>

                <form onSubmit={handleSignup}>
                    <label htmlFor="f_name">First Name</label>
                    <input
                        type="text"
                        id="f_name"
                        name="f_name"
                        value={formData.f_name}
                        onChange={handleChange}
                    />

                    <label htmlFor="l_name">Last Name</label>
                    <input
                        type="text"
                        id="l_name"
                        name="l_name"
                        value={formData.l_name}
                        onChange={handleChange}
                    />

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit">Sign Up</button>
                </form>

                {message && (
                    <p className={isError ? "message error" : "message success"}>
                        {message}
                    </p>
                )}
            </section>
        </main>
    );
}

export default App;