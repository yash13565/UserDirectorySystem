import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './UserList.module.css'
const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersList = response?.data;
        const userWithPostList = [];
        for (const user of usersList) {
          const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
          user.posts = res.data.length;
          userWithPostList.push(user);
        }
        setUsers(userWithPostList);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUsers();
  }, []);
  console.log(users, 'user')
  return (
    <div className={style.userCard}>
      <h2 className={style.heading}>User Directory</h2>
      {users?.map((user) => (
        <Link className={style.links} key={user.id} to={`/user/${user.id}`}>
          <div className={style.userCardTop}>
            <div className={style.userCardName}>Name: {user.name}</div>
            <div className={style.userCardPosts}>{`Posts: ${user?.posts || 0}`}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
