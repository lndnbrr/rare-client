'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditCommentModal({ show, onClose, onSave, commentObj }) {
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (commentObj) {
      setEditedContent(commentObj.content);
    }
  }, [commentObj]);

  const handleSaveClick = () => {
    if (editedContent.trim() !== '') {
      onSave({ id: commentObj.id, content: editedContent });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveClick();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editCommentTextarea">
            <Form.Control as="textarea" rows={4} value={editedContent} onChange={(e) => setEditedContent(e.target.value)} placeholder="Edit your comment..." onKeyDown={handleKeyDown} autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

EditCommentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }),
};

EditCommentModal.defaultProps = {
  commentObj: null,
};
