import React from 'react';
import { Notification } from 'antd';
import shortid from 'shortid';
import DndComp from '../../components/DndComp';
import { generateElement } from '../../core';
import './index.less';

export default class Configurable extends React.PureComponent {
  static ContainerHeightDivsion = {
    Form: 3,
    Grid: 10,
    FormItem: 15,
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
      formContainerRange: {},
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
    const { elements, pageRect, formContainerRange } = prevState;
    const { currentDragMaterial, currentElement, willDeleteElementId } = nextProps;
    const materialRect = currentDragMaterial.layout || {};
    // 拖拽生成元素
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
          if (formContainerRange.id && preElement.tagName === 'Form') {
            Notification.info({
              message: '注意事项',
              description: '页面配置中只允许放置一个表单容器',
            });
            return null;
          }
          if (preElement.tagName === 'FormItem') {
            if (formContainerRange.id) {
              if (formContainerRange.left <= preElement.layout.x && formContainerRange.top >= preElement.layout.y) {
                return null;
              }
            } else {
              return null;
            }
          }
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
            newRealElement.hidden = true;

            extraValue.childrenIds = [newRealElement.id];
          }
        }
        if (preElement.tagName === 'Table') {
          preElement.layout.x = 0;
        }
        const newElement = generateElement(preElement, extraValue);
        if (newElement) {
          const currentElements = [...elements, newElement];
          if (newRealElement) {
            currentElements.push(newRealElement);
          }
          let newFormContainerRange = formContainerRange; // FormContainerRnge
          if (currentElements.length !== elements.length) {
            if (newElement.tagName === 'Form') {
              newFormContainerRange = {
                id: newElement.id,
                type: newElement.type,
                tagName: newElement.tagName,
                left: newElement.layout.x,
                right: newElement.layout.x + newElement.layout.w,
                top: newElement.layout.y,
                bottom: newElement.layout.y + newElement.layout.h,
              };
            }
            return {
              elements: currentElements,
              formContainerRange: newFormContainerRange,
            };
          }
        }
      }
    }
    // 更新元素
    if (currentElement.id) {
      const index = elements.find((_) => _.id === currentElement.id);
      elements[index] = currentElement;
      return {
        elements: [...elements],
      };
    }
    // 删除元素
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
    const { onSelect, onDelete } = this.props;
    return (
      <div className='apc-configure-layout' ref={this.layoutRef}>
        <div className='apc-configure-page' style={{ width: pageRect.width, height: pageRect.height }}>
          {
            elements.filter((n) => !n.hidden).map((n) => (
              <DndComp
                key={n.id}
                value={n}
                pageRect={pageRect}
                onClick={onSelect}
                onDelete={onDelete}
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
