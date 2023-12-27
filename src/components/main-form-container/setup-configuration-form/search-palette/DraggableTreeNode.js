// DraggableTreeNode.js
import React from 'react';


const DraggableTreeNode = ({ node, onDragStart }) => {
    const handleDragStart = (e) => {
      e.dataTransfer.setData('text/plain', JSON.stringify(node));
      onDragStart(node);
    };
  
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        style={{ cursor: 'move', padding: '8px', margin: '4px', border: '1px solid #ccc' }}
      >
        {node.name}
      </div>
    );
  };


export default DraggableTreeNode;
