import React from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';
import './index.less';

let now = Date.now();

export default class DndComp extends React.PureComponent {
  state = {
    limitBounds: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.limitBounds) {
      const { value, pageRect } = nextProps;
      if (value.layout.inPage) {
        return {
          limitBounds: {
            left: 0,
            top: 0,
            right: pageRect.width - value.layout.w,
            bottom: pageRect.height - value.layout.h,
          },
        };
      }
    }
    return null;
  }


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

  keyBoardOperation = (e) => {
    const { value, onChange } = this.props;
    if (e.keyCode === 37) {
      value.setLayout({
        x: value.layout.x + 1,
        y: value.layout.y,
      });
      onChange(value.id, value);
    } else if (e.keyCode === 38) {
      value.setLayout({
        x: value.layout.x,
        y: value.layout.y - 1,
      });
      onChange(value.id, value);
    } else if (e.keyCode === 39) {
      value.setLayout({
        x: value.layout.x - 1,
        y: value.layout.y,
      });
      onChange(value.id, value);
    } else if (e.keyCode === 40) {
      value.setLayout({
        x: value.layout.x,
        y: value.layout.y + 1,
      });
      onChange(value.id, value);
    }
  }

  render() {
    const { limitBounds } = this.state;
    const { value } = this.props;
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
        bounds={limitBounds || {}}
        onStart={this.onDragHandler.bind(this, 'onDragStart')}
        onDrag={this.onDragHandler.bind(this, 'onDrag')}
        onStop={this.onDragHandler.bind(this, 'onDragStop')}
      >
        <div className={cls} id={id} onKeyDown={this.keyBoardOperation} tabIndex='-1'>
          {this.props.children}
        </div>
      </Draggable>
    );
  }
}
