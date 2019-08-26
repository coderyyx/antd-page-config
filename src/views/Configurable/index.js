import React from 'react';
import shortid from 'shortid';
import DndComp from '@/components/DndComp';
import { generateElement } from '@/material';
import './index.less';

export default class Configurable extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      elements: [],
      layoutRect: null,
      pageRect: {
        width: 0,
        height: 0,
      },
    };
    this.elementTree = {
      root: React.createElement('<div />'),
    };
    this.layoutRef = React.createRef();
  }

  componentDidMount() {
    if (!this.state.layoutRect) {
      const layoutRect = this.layoutRef.current.getBoundingClientRect();
      // page rect
      const width = Math.round((layoutRect.width + 200) * 0.7);
      const height = Math.round(((layoutRect.width + 200) * 0.7) / 1.406);
      const left = layoutRect.left + Math.round((layoutRect.width - width) / 2);
      const top = layoutRect.top + Math.round((layoutRect.height - height) / 2);
      this.setState({
        layoutRect,
        pageRect: {
          width,
          height,
          left,
          top,
          x: left,
          y: top,
          right: left + width,
          bottom: top + height,
        },
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { elements, layoutRect, pageRect } = prevState;
    const { currentDragMaterial, currentElement, willDeleteElementId } = nextProps;
    const materialRect = currentDragMaterial.layout || {};
    if (!elements.some((_) => _.id === currentDragMaterial.id) && currentDragMaterial.id) {
      if (materialRect.x >= layoutRect.left && materialRect.x + materialRect.w <= layoutRect.right
        && materialRect.y >= layoutRect.top && materialRect.y + materialRect.h <= layoutRect.bottom) {
        currentDragMaterial.layout.x -= pageRect.left;
        currentDragMaterial.layout.y -= pageRect.top;
        let newRealElement; // Form，Row
        const extraValue = {};
        if (currentDragMaterial.type === 'containerComp') {
          let containerWidth;
          let containerHeight;
          if (currentDragMaterial.layout.x >= 0 && currentDragMaterial.layout.x <= pageRect.width
            && currentDragMaterial.layout.y >= 0 && currentDragMaterial.layout.y <= pageRect.height) {
            containerWidth = pageRect.width - currentDragMaterial.layout.x;
            containerHeight = Math.round(pageRect.height / nextProps.ContainerHeightDivsion[currentDragMaterial.tagName]);
            extraValue.layout = {
              w: containerWidth,
              h: containerHeight,
              maxW: pageRect.width,
              maxH: pageRect.height,
              inPage: true,
            };
          } else {
            containerWidth = layoutRect.width - currentDragMaterial.layout.x;
            containerHeight = Math.round(layoutRect.height / nextProps.ContainerHeightDivsion[currentDragMaterial.tagName]);
            extraValue.layout = {
              w: containerWidth,
              h: containerHeight,
              inPage: false,
            };
          }
          extraValue.style = {
            width: containerWidth,
            height: containerHeight,
          };
          if (currentDragMaterial.tagName === 'Form') {
            newRealElement = generateElement({
              id: shortid(),
              tagName: 'Form',
              type: 'realContainerComp',
            });
            extraValue.childrenIds = [newRealElement.id];
          }
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
      if (index) {
        elements.splice(index, 1);
        return {
          elements: [...elements],
        };
      }
      return null;
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
    const { elements, pageRect } = this.state;
    const { onSelect } = this.props;
    return (
      <div className='apc-configure-layout' ref={this.layoutRef}>
        <div className='apc-configure-page' style={{ width: pageRect.width, height: pageRect.height }}>
          {
            elements.map((n) => (
              <DndComp
                key={n.id}
                value={n}
                pageRect={pageRect}
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
