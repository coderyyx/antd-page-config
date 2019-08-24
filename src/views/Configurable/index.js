import React from 'react';
import DndComp from '@/components/DndComp';
import { generateElement } from '@/material';
import './index.less';

export default class Configurable extends React.PureComponent {
  constructor() {
    super();
    this.layoutRef = React.createRef();
    this.state = {
      elements: [],
      layoutRect: null,
      pageSize: {
        width: 0,
        height: 0,
      },
    };
  }

  componentDidMount() {
    if (!this.state.layoutRect) {
      const layoutRect = this.layoutRef.current.getBoundingClientRect();
      this.setState({
        layoutRect,
        pageSize: {
          width: Math.round(layoutRect.width * 0.7),
          height: Math.round((layoutRect.width * 0.7) / 1.406),
        },
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { elements, layoutRect, pageSize } = prevState;
    const { currentDragMaterial, currentElement, willDeleteElementId } = nextProps;
    const materialRect = currentDragMaterial.layout || {};
    if (!elements.some((_) => _.id === currentDragMaterial.id) && currentDragMaterial.id) {
      if (materialRect.x >= layoutRect.left && materialRect.x + materialRect.w <= layoutRect.right
        && materialRect.y >= layoutRect.top && materialRect.y + materialRect.h <= layoutRect.bottom) {
        currentDragMaterial.layout.x -= layoutRect.left;
        currentDragMaterial.layout.y -= layoutRect.top;
        let extraValue = {};
        if (currentDragMaterial.type === 'containerComp') {
          const { width } = pageSize;
          const height = Math.round(pageSize.height / nextProps.ContainerHeightDivsion[currentDragMaterial.tagName]);
          extraValue = {
            style: {
              width,
              height,
            },
            layout: {
              w: width,
              h: height,
            },
          };
        }
        const newElement = generateElement(currentDragMaterial, extraValue);
        if (newElement) {
          const currentElements = [...elements, newElement];
          if (currentElements.length !== elements.length) {
            return {
              elements: currentElements,
            };
          }
        }
      }
    }
    if (currentElement.id) {
      const index = elements.find((_) => _.id === currentElement.id);
      elements[index] = currentElement;
      return {
        elements: [...elements],
      };
    }
    if (willDeleteElementId) {
      const index = elements.find((_) => _.id === willDeleteElementId);
      elements.splice(index, 1);
      return {
        elements: [...elements],
      };
    }
    return null;
  }

  setElement = (id, element) => {
    const { elements } = this.state;
    const index = elements.findIndex((_) => _.id === id);
    elements[index] = element;
    this.setState({
      elements: [...elements],
    });
    if (element.type === 'containerComp') {
      this.props.onSelect(element);
    }
  }

  render() {
    const { elements, layoutRect, pageSize } = this.state;
    const { onSelect } = this.props;
    return (
      <div className='apc-configure-container' ref={this.layoutRef}>
        <div className='apc-configure-page-container' style={{ ...pageSize }}>
          <div className='apc-configure-page-bg' />
        </div>
        <div className='apc-configure-layout'>
          {
            elements.map((n) => (
              <DndComp
                key={n.id}
                value={n}
                areaRect={layoutRect}
                onClick={onSelect}
                onChange={this.setElement}
              >
                {n.render()}
              </DndComp>
            ))
          }
        </div>
      </div>
    );
  }
}

Configurable.defaultProps = {
  ContainerHeightDivsion: {
    Form: 3,
    Grid: 10,
  },
};
