import React from 'react';
import styled from 'styled-components';

const Article = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default styled(Article).attrs({
  navWidth: '200px',
})`
  position: relative;
  width: 100vh;
  left: ${(props) => props.navWidth};
  font-size: 18px;
`;
