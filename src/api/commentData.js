// API CALLS FOR COMMENTS
const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getHeaders = (uid) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${uid}`,
});

// CREATE COMMENT
const createComment = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/comments`, {
      method: 'POST',
      headers: getHeaders(uid),
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE COMMENT
const updateComment = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/comments/${payload.commentId}`, {
      method: 'PATCH',
      headers: getHeaders(uid),
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE COMMENT
const deleteComment = (commentId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET ALL COMMENTS FOR A POST
const getCommentsByPostId = (postId, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/comments?post=${postId}`, {
      method: 'GET',
      headers: getHeaders(uid),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

export { createComment, updateComment, deleteComment, getCommentsByPostId };
