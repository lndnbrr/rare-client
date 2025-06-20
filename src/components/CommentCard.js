import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faGear } from '@fortawesome/free-solid-svg-icons';

export default function CommentCard({ obj, onEditClick, onDeleteClick }) {
  return (
    <div className="border-1 border-white rounded-xl flex flex-col">
      <div className="flex flex-row justify-end m-1 h-[30px]">
        {obj.is_author ? (
          <div className="flex">
            <button type="button" className="size-8" onClick={() => onEditClick(obj)} aria-label="Edit comment">
              <FontAwesomeIcon icon={faGear} className="transition-200 transition-opacity hover:opacity-50 active:opacity-100 w-full h-4/5" />
            </button>
            <button type="button" className="size-8" onClick={() => onDeleteClick(obj)} aria-label="Delete comment">
              <FontAwesomeIcon icon={faTrashCan} className="transition-200 transition-opacity hover:opacity-50 active:opacity-100 w-full h-4/5" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="text-center flex-grow-1">{obj.content}</div>
      <div className="h-[20px]" />
      <div className="text-center">- {obj.author_full_name}</div>
      <div className="text-right mx-2 text-sm text-gray-400">{obj.creation_date}</div>
    </div>
  );
}

CommentCard.propTypes = {
  obj: PropTypes.shape({
    is_author: PropTypes.bool,
    id: PropTypes.number,
    content: PropTypes.string.isRequired,
    author_full_name: PropTypes.string.isRequired,
    creation_date: PropTypes.string.isRequired,
  }).isRequired,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
