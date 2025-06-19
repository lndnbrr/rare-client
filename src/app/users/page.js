'use client';

import { useEffect, useState } from 'react';
import { getAllUsers } from '@/api/userData';
import UserCard from '@/components/UserDisplayCard';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
  }, []);

  console.log('users:', users);

  return (
    <div className="d-flex flex-column justify-content-center">
      {users.map((user) => (
        <UserCard userObj={user} />
      ))}
    </div>
  );
}
