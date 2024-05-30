import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, movies, syncUser }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`https://movies-flixmcn-ed96d6a64be1.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, [user]);

  const handleDeregister = () => {
    const token = localStorage.getItem('token');
    fetch(`https://movies-flixmcn-ed96d6a64be1.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert('Your account has been deleted');
          localStorage.clear(); // Clear local storage
          window.location.reload();
          navigate('/login'); // Redirect to the home page or login page
        } else {
          alert('Error deleting account');
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        alert('Error deleting account');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>User not found</div>;
  }

  const favoriteMovies = movies?.length
    ? movies.filter(m => userInfo.FavoriteMovies.includes(m._id))
    : [];

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card style={{ backgroundColor: '#f8f8f8' }}>
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
             <Card.Title>{userInfo.Username}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {userInfo.Email}
              </Card.Text>
              <Card.Text>
                <strong>Birth Date:</strong> {userInfo.BirthDate}
              </Card.Text>
                <strong>Favorite Movies:</strong>
                <FavoriteMovies movies={movies} user={userInfo} />
                <Row>
                {favoriteMovies.map((movie) => (
                  <Col key={movie._id} md={6} className="mb-4">
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
              <Link to={`/user/settings`} style={{ textDecoration: 'none' }}> 
          <Button style={{ backgroundColor: '#57636F', color: 'white', marginRight: '10px'  }} variant="link">
            Update User Profile
          </Button>
        </Link>
        <Button 
                style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }} 
                variant="link" 
                onClick={handleDeregister}
              >
                Deregister
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};