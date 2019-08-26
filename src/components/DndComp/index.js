import React from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';
import './index.less';

let now = Date.now();

export default class DndComp extends React.Component {
  onDragHandler = (handlerName, _, data) => {
    const { value, onClick, onChange } = this.props;
    switch (handlerName) {
      case 'onDragStart':
        onClick(value);
        break;
      case 'onDrag':
        if (value.type === 'containerComp') {
          // 阻止拖拽时不停更新
          if (Date.now() - now > 200) {
            value.setLayout({
              x: data.x,
              y: data.y,
            });
            onChange(value.id, value);
            now = Date.now();
          }
        }
        break;
      case 'onDragStop':
        value.setLayout({
          x: data.x,
          y: data.y,
        });
        onChange(value.id, value);
        break;
      default:
        break;
    }
  }

  render() {
    const { value, pageRect } = this.props;
    const { id, layout = { x: 0, y: 0 }, containerClassName } = value;
    if (!id) {
      return null;
    }
    const cls = classnames('apc-dnd', containerClassName);
    return (
      <Draggable
        axis='both'
        handle='.apc-dnd'
        position={{ x: layout.x, y: layout.y }}
        grid={[1, 1]}
        scale={1}
        bounds={{
          left: pageRect.limitLeft,
          top: pageRect.limitTop,
        }}
        onStart={this.onDragHandler.bind(this, 'onDragStart')}
        onDrag={this.onDragHandler.bind(this, 'onDrag')}
        onStop={this.onDragHandler.bind(this, 'onDragStop')}
      >
        <div className={cls} id={id}>
          {this.props.children}
        </div>
      </Draggable>
    );
  }
}
