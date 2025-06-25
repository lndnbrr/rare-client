/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

'use client';

/* eslint-disable import/no-duplicates */
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from 'react-bootstrap';
import PostForm from '../../components/PostForm';
import PostCard from '../../components/PostCard';
import { getPostByUserId } from '../../api/postData';
// eslint-disable-next-line no-unused-vars
import { getAllPosts } from '../../api/postData';
import { useAuth } from '../../utils/context/authContext';

export default function GetOtherUsersPosts() {
  const [posts, setPosts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [author, setAuthor] = useState({});
  const [update, setUpdate] = useState();
  const params = useParams();
  const { id } = params;

  const { user } = useAuth(); // Commented out until correct import path is found

  // eslint-disable-next-line no-undef
  const getPosts = useCallback(() => {
    getPostByUserId(id).then(setPosts);
  });

  useEffect(() => {
    getPosts();
  }, [getAllPosts, update]);

  return (
    <>
      <div className="user-profile-container">
        {/* ---sub--row--- */}
        <div
          style={{
            margin: '20px 0px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          <div />
        </div>

        {/* <Card style={{ width: '30rem', margin: '10px' }}>
          <Card.Body>
            <Image
              className="rounded-circle"
              style={{ width: '90px', height: '90px' }}
              alt="profile-img"
              src={author.profile_image_url}
            />
            <h2 className="full-name">{author.first_name} {author.last_name}</h2>
            <h5 className="card-text">@ {author.email}</h5>
            <h5 className="card-text">Bio: {author.bio}</h5>
            <p className="card-text text-center">Profile created on : {author.created_on}</p>
          </Card.Body>
          </Card> */}
      </div>
      <Button size="md">
        Add New post: <PostForm />{' '}
      </Button>
      <div
        id="user-tours-cards"
        className="d-flex flex-wrap"
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div className="posts-header">
          <h3>Posts:</h3>
        </div>
        {posts?.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} setAuthor={setAuthor} />
        ))}
      </div>
    </>
  );
}
