import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown/with-html';

const Posts = () => {
  const { section, post } = useParams();

  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(`../../TIL/${section}/${post}.md`)
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <ReactMarkdown source={markdown} />
    </div>
  );
};

export default Posts;
