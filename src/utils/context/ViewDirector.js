import PropTypes from 'prop-types';
import RegisterForm from '@/components/RegisterForm';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import NavBar from '@/components/NavBar';
// import PostComments from '../../app/posts/[postId]/comments/page';
// import CommentCard from '@/components/CommentCard';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const { user, userLoading, updateUser } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        {/* The comments below this one are for testing purposes only - JG */}
        {/* PostComments page testing */}
        {/* <div className="container">{'valid' in user ? <PostComments /> : children}</div> */}
        {/* CommentCard Testing */}
        {/* <div className="container">{'valid' in user ? <CommentCard obj={{ id: '2', author_full_name: 'Johnny Dime', content: 'Patrick Star', creation_date: '02/25/2025 at 08:30 PM', is_author: true }} /> : children}</div> */}
        {/* Actual Code */}
        <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : children}</div>
      </>
    );
  }

  return <SignIn />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
