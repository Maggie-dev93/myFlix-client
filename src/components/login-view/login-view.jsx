import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movies-flixmcn-ed96d6a64be1.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    //one liner arrow functions you can omit the return and brackets if function is one line//
    .then((response) => response.json())
    .then((data) => {
      console.log('Login response: ', data);
      if (data.user) {
        //if we find a user assign them to our local storage//
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        console.log('successful login');
        onLoggedIn(data.user, data.token);
        window.location.reload();
      } else {
        alert('Username or Password is incorrect');
      }
    })
    .catch((e) => {
      console.log(e);
    });
};


  return (
    <div className="login-form-container">
    <Form onSubmit={handleSubmit}>
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
};
