import PropTypes from 'prop-types';
import { Card, Form } from 'react-bootstrap';

export default function UserCard({ userObj }) {
  return (
    <Card style={{ height: '5rem', width: '50%' }}>
      <Card.Body>
        <div className="d-flex flex-row justify-content-between" style={{ height: '100%' }}>
          <Card.Title>
            {' '}
            {userObj.first_name} {userObj.last_name}{' '}
          </Card.Title>
          {/* placeholder for admin user deactivate toggling */}
          <div className="d-flex flex-row">
            {userObj.active ? (
              <Form>
                <Form.Check type="checkbox" isValid />
              </Form>
            ) : (
              <Form>
                <Form.Check type="checkbox" isInvalid />
              </Form>
            )}
            <Card.Text>Active</Card.Text>
          </div>
          {/* placeholder for admin to assign admin/author for other users */}
          <div className="d-flex flex-row">
            {userObj.is_staff ? (
              <>
                <Form>
                  <Form.Check type="radio" isValid />
                </Form>
                <Card.Text>Admin</Card.Text>
                <Form>
                  <Form.Check type="radio" isInvalid />
                </Form>
                <Card.Text>Author</Card.Text>
              </>
            ) : (
              <>
                <Form>
                  <Form.Check type="radio" isInvalid />
                </Form>
                <Card.Text>Admin</Card.Text>
                <Form>
                  <Form.Check type="radio" isValid />
                </Form>
                <Card.Text>Author</Card.Text>
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    is_staff: PropTypes.string.isRequired,
  }).isRequired,
};
