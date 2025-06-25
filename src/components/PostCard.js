'use client';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eqeqeq */
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { deletePost } from '../api/postData';
import { useAuth } from '../utils/context/authContext';

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <div className="post-styling">
      <div className="top-row_user-card">
        <div />
        <div>
          <h2>Category: {postObj.category?.label} </h2>
          <h2>Title: {postObj.title} </h2>
          <h5>
            Author: {postObj.user.first_name} {postObj.user.last_name}{' '}
          </h5>
        </div>
        <div id="user-trophy" className="centered">
          {postObj.user.uid === user.uid && <div />}
        </div>
      </div>
      <div>
        <h6 style={{ fontSize: '12pt' }}>Published: {postObj.publication_date}</h6>
      </div>
      <div>
        <h6> Content: {postObj.content}</h6>
      </div>
      <Card.Img src={postObj.image_url} alt={postObj.title} style={{ width: '200px', height: '200px', marginTop: '10px' }} />
      <Card.Body
        style={{
          marginTop: '18px',
          marginBottom: '12px',
          display: 'flex',
          gap: '15px',
        }}
      >
        {user.uid == postObj.user?.uid ? (
          <>
            <Link href={`/posts/edit/${postObj.id}`} passHref>
              <Button id="edit-btn">Edit</Button>
            </Link>
            <Button id="del-btn" onClick={deleteThisPost}>
              Delete
            </Button>
          </>
        ) : (
          <Link href={`/post/edit${postObj.id}`} passHref>
            <Button id="view-btn">view</Button>
          </Link>
        )}
      </Card.Body>
    </div>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    id: PropTypes.number,
    category: PropTypes.string,
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      bio: PropTypes.string,
      profile_img_url: PropTypes.string,
      email: PropTypes.string,
      uid: PropTypes.string,
      category: PropTypes.shape({
        label: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
      onUpdate: PropTypes.func.isRequired,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
