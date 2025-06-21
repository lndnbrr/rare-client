'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { getSingleUser } from '@/api/userData';

export default function UserProfilePage({ params }) {
  const [user, setUser] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleUser(id).then((data) => setUser(data));
  }, [id]);

  const staff = () => {
    if (user.is_staff) {
      return 'Profile Type: Admin';
    }
    return 'Profile Type: Author';
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image src={user.profile_image_url} roundedCircle />
          </Col>
        </Row>
      </Container>
      <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Name: {user.first_name} {user.last_name}
          </ListGroup.Item>
          <ListGroup.Item>Email: {user.email}</ListGroup.Item>
          <ListGroup.Item>Profile Created: {user.created}</ListGroup.Item>
          <ListGroup.Item>{staff()}</ListGroup.Item>
        </ListGroup>
        <Button type="button" variant="warning" href={`/users/update/${user.id}`}>
          Edit Me!
        </Button>
      </Card>
    </>
  );
}

UserProfilePage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
