import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const ProfileView = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>User not found</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
              <Card.Title>{userInfo.Username}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {userInfo.Email}
              </Card.Text>
              <Card.Text>
                <strong>Birth Date:</strong> {userInfo.BirthDate}
              </Card.Text>
              <Card.Text>
                <strong>Favorite Movies:</strong>
                <ul>
                  {userInfo.FavoriteMovies.map((movieId) => (
                    <li key={movieId}>{movieId}</li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};