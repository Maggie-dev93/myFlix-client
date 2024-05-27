import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../index.scss';
import '../login-view/login-view.scss';


export const UpdateUser = ({ user, token }) => { 
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  const updateHandler = (event) => {
    event.preventDefault();
    const data = {
      Username: updatedUsername,
      Password: updatedPassword,
      Email: updatedEmail,
    };

    //sends request to our update endpoint in the back end with a PUT request//
    fetch(`https://movies-flixmcn-ed96d6a64be1.herokuapp.com/users/${user.user.Username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' // Added Content-Type header
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
          alert('Update Successful');
          window.location.reload();
        } else {
          alert('Update failed');
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="login-form-container">
      <Form onSubmit={updateHandler}>
        <Form.Label>New Username</Form.Label>
        <Form.Control
          type='text'
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
          placeholder='New Username'
          className='mb-3'
        ></Form.Control>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type='password' // Changed to password for better UX
          value={updatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
          placeholder='New Password'
          className='mb-3'
        ></Form.Control>
        <Form.Label>New Email</Form.Label>
          <Form.Control
          type='email' 
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
          placeholder='New Email'
          className='mb-3'
        ></Form.Control>
        <Button variant='danger' type='submit' className='mt-3'>
          Update
        </Button>
      </Form>
      <Link to={'/user'}>
        <Button variant='primary' className='mt-3'>
          Back
        </Button>
      </Link>
    </div>
  );
};
