import React, { useState, useEffect } from 'react';

const Posts = ({ posts }) => {
  useEffect(() => {
    console.log(posts);
  });

  return <div>{posts.map((post) => `${Object.keys(post)}`)}</div>;
};

export default Posts;
