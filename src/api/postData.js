const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getAllPosts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSinglePost = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createPost = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deletePost = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const updatePost = (payload, id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const getPostByUserId = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/posts?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getAllPosts, getSinglePost, createPost, deletePost, updatePost, getPostByUserId };
