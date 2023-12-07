// Popup.js
import React from 'react';
import style from './Popup.module.css'
const Popup = ({ post, onClose }) => {
  console.log(post,'post')
  return (
    <div className={style.popupContainer} onClick={onClose}>
      <div className={style.popupContent} onClick={(e) => e.stopPropagation()}>
        <span className={style.close} onClick={onClose}>
          &times;
        </span>
        <p> Id: {post.id}</p>
        <p> userId: {post.userId}</p>
        <h2>Title: {post.title}</h2>
        <p> Content: {post.body}</p>
      </div>
    </div>
  );
};

export default Popup;
