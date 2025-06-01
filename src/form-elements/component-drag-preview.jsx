/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';

const boxStyles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
};

const Box = ({ title, color }) => {
  const backgroundColor = color ? '#059862' : 'white';
  return <div style={{ ...boxStyles, backgroundColor }}>{title}</div>;
};

export const BoxDragPreview = ({ item }) => {
  const [tickTock, setTickTock] = useState(false);

  const text = item.data.content
    ? item.data.content
    : item.data.label
    ? item.data.label
    : item.data.text;
  const isLongText = text.length > 20;
  const previewText = isLongText ? `${text.slice(0, 20)}...` : text;

  return (
    <div style={styles} role="BoxPreview">
      <Box title={previewText} color={tickTock} />
    </div>
  );
};
