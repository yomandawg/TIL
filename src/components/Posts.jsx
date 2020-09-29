import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts.map((section, index) => (
          <li key={index}>
            <Link to={'/posts/' + Object.keys(section)}>
              {Object.keys(section)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
