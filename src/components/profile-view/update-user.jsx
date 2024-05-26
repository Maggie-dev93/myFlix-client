import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const UpdateUser = ({ user, token }) => {
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');

  const handleUserUpdated = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const data = {
      Username: updatedUsername,
      Password: UpdatedPassword,
      Email: updatedEmail,
    };

    fetch(`https://movies-flixmcn-ed96d6a64be1.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedUsername) => {
        localStorage.setItem('user', JSON.stringify(updatedUsername));
        onUserUpdated(user);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Update User Information</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>New Username</Form.Label>
              <Form.Control
                type="text"
                value={updatedUsername}
                onChange={(e) => setUpdatedUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={updatedPassword}
                onChange={(e) => setUpdtedPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>New Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Link to={'/profile'}>
        <Button type='primary' className='mt-3'>
          Back
        </Button>
      </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};