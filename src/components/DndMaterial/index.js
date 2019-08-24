import React, { useState } from 'react';
import './index.less';

export default function DndMaterial(props) {
  const { children, onChange } = props;
  const [style, setStyle] = useState({});
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });

  function handleDragStart(e) {
    setStyle({
      ...style,
      opacity: 0.5,
    });
    setPosition({
      ...position,
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
  }
  function handleDrag() {

  }
  function handleDragEnd(e) {
    const materialRect = e.target.getBoundingClientRect();
    const left = e.nativeEvent.pageX - position.offsetX;
    const top = e.nativeEvent.pageY - position.offsetY;
    setStyle({
      ...style,
      opacity: 1,
    });
    if (onChange) {
      onChange({
        x: left,
        y: top,
        w: materialRect.width,
        h: materialRect.height,
      });
    }
  }

  return (
    <div
      draggable
      className='drag'
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={style}
    >
      {children}
    </div>
  );
}
