'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { getSinglePost } from '../../../../api/postData';
import PostForm from '../../../../components/PostForm';

export default function EditPost({ params }) {
  const [editItem, setEditItem] = useState({});
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();

  const { id } = params;

  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  return <PostForm obj={editItem} setEditObj={setEditItem} />;
}

EditPost.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
