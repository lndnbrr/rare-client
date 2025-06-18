'use client';

import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteCommentModal({ show, onClose, onDelete, commentObj }) {
  const handleDeleteClick = () => {
    onDelete(commentObj.id);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="text-black">Are you sure you want to delete this comment?</h2>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

DeleteCommentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
  }),
};

DeleteCommentModal.defaultProps = {
  commentObj: null,
};
