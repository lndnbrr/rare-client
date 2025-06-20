const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

export const getAllCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const createNewCategory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/category`, {
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

export const deleteCategory = (categoryId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/category/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete category');
        }
        resolve();
      })
      .catch(reject);
  });

export const updateCategory = (categoryId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/category/${categoryId}`, {
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
