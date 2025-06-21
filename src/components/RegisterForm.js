import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { updateToUser } from '../api/userData';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({});

  const router = useRouter();

  useEffect(() => {
    setFormData({
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      bio: user.bio || '',
      email: user.email || '',
      active: true,
      PFP: user.profile_image_url || '',
      isStaff: user.is_staff || false,
      uid: user.uid,
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      updateToUser(formData, user.id).then(() => router.push(`/users/${user.id}`));
    } else {
      registerUser(formData).then(() => updateUser(user.uid));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" required value={formData.firstName} placeholder="Enter your First Name" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" required value={formData.lastName} placeholder="Enter your Last Name" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required value={formData.bio} placeholder="Enter your Bio" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" required value={formData.email} placeholder="Enter your Email" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPFP">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type="text" name="PFP" required value={formData.PFP} placeholder="Enter the URL to your PFP" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formIsStaff">
        <Form.Check
          type="switch"
          name="isStaff"
          label="Are you a staff member?"
          checked={formData.isStaff}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              isStaff: e.target.checked,
            }));
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Do it!
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    profile_image_url: PropTypes.string.isRequired,
    is_staff: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
