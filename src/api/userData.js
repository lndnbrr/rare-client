// shared endpoint for the BE database
const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getAllUsers = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleUser = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateToUser = (payload, id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// Will be implemented in future components
const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllUsers, getSingleUser, updateToUser, deleteUser };
