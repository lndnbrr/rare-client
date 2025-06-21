'use client';

import { useEffect, useState } from 'react';
import RegisterForm from '@/components/RegisterForm';
import { getSingleUser } from '@/api/userData';
import PropTypes from 'prop-types';

export default function UpdateUserPage({ params }) {
  const [user, setUser] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleUser(Number(id)).then((data) => setUser(data));
  }, [id]);

  return <RegisterForm user={user} />;
}

UpdateUserPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
