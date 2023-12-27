// DropTarget.js
import React from 'react';

const DropTarget = ({ onDrop }) => {
    const handleDrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      const droppedItem = JSON.parse(data);
      onDrop(droppedItem);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    return (
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: '1px solid black', height: '300px', padding: '20px' }}
      >
        Drop Here
      </div>
    );
  };
export default DropTarget;
