

import React from 'react';

const Post = ({ title, onClick }) => (
  <li onClick={onClick}>
    {title}
  </li>
);

export default Post;
