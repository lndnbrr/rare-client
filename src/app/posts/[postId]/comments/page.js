'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import CommentCard from '../../../../components/CommentCard';
import { createComment, getCommentsByPostId } from '../../../../api/commentData';
import { useAuth } from '../../../../utils/context/authContext';

export default function PostComments({ postObj }) {
  const user = useAuth();
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const fetchComments = () => {
    getCommentsByPostId(postObj.id, user.user.fbUser.uid).then(setComments);
  };
  useEffect(() => {
    fetchComments();
  });
  const onEditClick = () => {
    console.log('edited');
  };
  const onDelete = (e) => {
    console.log(e.id);
  };
  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentObj = {
      content: commentInput,
      post: postObj.id,
    };
    createComment(commentObj, user.user.fbUser.uid).then(() => {
      fetchComments();
      setCommentInput('');
    });
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-[40px] text-center mb-2">{postObj.title}&apos;s Comments</h1>
        <Form className="w-50 mb-6">
          <Form.Group className="mb-1" controlId="commentForm">
            <Form.Control
              as="textarea"
              className="h-[100px] resize-none"
              type="text"
              placeholder="Type your comment here..."
              onChange={handleChange}
              value={commentInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <p className="opacity-50">Shift + Enter for New Line</p>
          </Form.Group>
          <div className="flex justify-end">
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <div className="w-50 mx-auto grid grid-cols-2 gap-2">
        {comments.map((comment) => (
          <CommentCard key={comment.id} obj={comment} onEditClick={onEditClick} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
}
PostComments.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
