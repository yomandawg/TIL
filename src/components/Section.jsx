import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Section = ({ posts }) => {
  const { section } = useParams();

  const items = Object.values(
    posts.filter((post) => Object.keys(post) == section)[0]
  )[0];

  return (
    <ul>
      {items.map((post, index) => {
        return (
          <li key={index}>
            <Link to={`/posts/${section}/${post.slice(0, -3)}`}>
              {post.slice(0, -3)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Section;
