import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For pages directory
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createPost, updatePost } from '../api/postData';
import { getAllCategories } from '../api/categoryData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  title: '',
  image_url: '',
  category: '',
  content: '',
  approved: true,
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) {
      setFormInput({
        ...obj,
        category: obj.category?.id || '',
      });
    }
  }, [obj]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      updatePost({
        ...formInput,
        id: formInput.id,
      }).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        publicationDate: new Date().toJSON().slice(0, 10),
      };
      console.log(payload);
      createPost(payload).then(() => router.push('/'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj?.id ? 'Update' : 'Add a'} Post</h2>

      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control type="text" placeholder="Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
        <Form.Control type="url" placeholder="imageUrl" name="image_url" value={formInput.image_url} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select aria-label="Category" name="category" onChange={handleChange} className="mb-3" value={formInput.category}>
          <option value="">Select applicable category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Post Content" className="mb-3">
        <textarea className="form-control" placeholder="Content" name="content" value={formInput.content} onChange={handleChange} style={{ height: '300px' }} required />
      </FloatingLabel>

      <Button variant="secondary" type="submit">
        {obj?.id ? 'Update' : 'Create'} Post
      </Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
    category: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PostForm.defaultProps = {
  obj: null,
};

export default PostForm;
