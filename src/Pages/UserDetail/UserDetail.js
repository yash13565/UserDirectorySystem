import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Clock from '../Clock/Clock';
import Post from '../Post/Post';
import style from './UserDetails.module.css'
import CustomButton from '../../Components/Atoms/CustomButton/CustomButton';

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseUser = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUser(responseUser.data);

        const responsePosts = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        setPosts(responsePosts.data);

      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, [userId]);
  const handleBackNavigation = () => {
    navigate('/')
  }
  return (
    <>
      <div className={style.headingTitle}>
        <h2>{user?.name} Profile</h2>
      </div>
      <CustomButton onClick={handleBackNavigation} className={style.backButton} text={'Go back'} />
      <Clock />
      {user && (
        <>
          <div className={style.userDetails}>
            <div>
              <p>{user?.name}</p>
              <p>{user?.username} | {user?.company?.catchPhrase}</p>
            </div>
            <div>
              <p>{user?.address?.street}, {user?.address?.city}</p>
              <p>{user?.email} | {user?.phone}</p>
            </div>
          </div>
          <div className={style.userPosts}>
            <div className={style.postContainer}>
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetail;
