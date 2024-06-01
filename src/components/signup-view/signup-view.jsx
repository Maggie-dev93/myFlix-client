import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './signup-form.scss';
import { useNavigate } from "react-router-dom";


export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook


  const handleSubmit = (event) => {
    event.preventDefault();
    const isoDate = new Date(birthDate).toISOString();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      BirthDate: isoDate,
    };

    fetch("https://movies-flixmcn-ed96d6a64be1.herokuapp.com/users", {
      method: "POST", // Changed to POST
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          navigate('/login'); // Redirect to the login page
        } else {
          alert("Signup failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Signup failed");
      });
  };

  return (
    <div className="signup-form-container">
    <form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
      <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
    </div>
  );
};
