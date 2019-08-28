import React from 'react';
import shortid from 'shortid';
import DndComp from '@/components/DndComp';
import { generateElement } from '@/core';
import './index.less';

export default class Configurable extends React.PureComponent {
  static ContainerHeightDivsion = {
    Form: 3,
    Grid: 10,
  }

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
    this.layoutRef = React.createRef();
    this.now = Date.now();
  }

  componentDidMount() {
    if (!this.state.layoutRect) {
      this.getLayoutAndPageRect();
    }
    window.addEventListener('resize', this.resize);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { elements, pageRect } = prevState;
    const { currentDragMaterial, currentElement, willDeleteElementId } = nextProps;
    const materialRect = currentDragMaterial.layout || {};
    if (!elements.some((_) => _.id === currentDragMaterial.id) && currentDragMaterial.id) {
      if (materialRect.x >= pageRect.left && materialRect.x + materialRect.w <= pageRect.right
        && materialRect.y >= pageRect.top && materialRect.y + materialRect.h <= pageRect.bottom) {
        // 预产生物料
        const preElement = {
          id: currentDragMaterial.id,
          tagName: currentDragMaterial.tagName,
          type: currentDragMaterial.type,
          layout: {
            x: currentDragMaterial.layout.x - pageRect.left,
            y: currentDragMaterial.layout.y - pageRect.top,
          },
        };
        let newRealElement; // Form，Row
        const extraValue = {};
        if (preElement.type === 'containerComp') {
          preElement.layout.x = 0;
          const containerWidth = pageRect.width;
          const containerHeight = Math.round(pageRect.height / Configurable.ContainerHeightDivsion[preElement.tagName]);
          extraValue.layout = {
            w: containerWidth,
            h: containerHeight,
            maxW: pageRect.width,
            maxH: pageRect.height,
          };
          extraValue.style = {
            width: containerWidth,
            height: containerHeight,
          };
          if (preElement.tagName === 'Form') {
            newRealElement = generateElement({
              id: shortid(),
              tagName: 'Form',
              type: 'realContainerComp',
            });
            extraValue.childrenIds = [newRealElement.id];
          }
        }
        if (preElement.tagName === 'Table') {
          preElement.layout.x = 0;
        }
        const newElement = generateElement(preElement, extraValue);
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
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

  getLayoutAndPageRect = () => {
    const layoutRect = this.layoutRef.current.getBoundingClientRect();
    // page rect
    const width = Math.round((layoutRect.width + 100) * 0.7);
    const height = Math.round(((layoutRect.width + 100) * 0.7) / 1.406);
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
    this.props.onChangePageSize({
      width,
      height,
    });
  }

  resize = () => {
    if (Date.now() - this.now > 500) {
      this.getLayoutAndPageRect();
      this.now = Date.now();
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
