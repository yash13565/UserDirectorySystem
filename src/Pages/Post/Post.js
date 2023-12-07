import React, { useState } from 'react';
import style from './Post.module.css'
import Popup from '../Popup/Popup';
const Post = ({ post }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handlePostClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <div onClick={handlePostClick} className={style.cards}>
        <strong>{post?.title}</strong>
        <p>{post?.body}</p>
      </div>
      {isPopupOpen && <Popup post={post} onClose={closePopup} />}
    </div>
  );
};

export default Post;
