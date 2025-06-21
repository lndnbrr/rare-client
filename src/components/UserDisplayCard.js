import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteUser } from '../api/userData';

export default function UserCard({ userObj, onUpdate }) {
  const removeUser = () => {
    deleteUser(userObj.id).then(() => onUpdate());
  };

  console.log('userObj.id', userObj.id);
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
            <Button variant="danger" onClick={removeUser}>
              deactive
            </Button>
          </div>
          {/* placeholder for admin to assign admin/author for other users */}
          <div className="d-flex flex-row">
            {userObj.is_staff ? (
              <Card.Text>Admin</Card.Text>
            ) : (
              <Card.Text>Author</Card.Text>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    is_staff: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
