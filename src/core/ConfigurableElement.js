import React from 'react';

class ConfigurableElement {
  /**
   *
   * @param {Object} material 物料
   * @param {Object} defaultElement 默认元素
   * @param {Object} enhanceValue 增强元素
   */
  static initialize(material, defaultElement = {}, enhanceValue = {}) {
    return new ConfigurableElement(material, defaultElement, enhanceValue);
  }

  // 配置元素集
  static Elements = []

  constructor(material, defaultElement, enhanceValue) {
    const { id, type, tagName } = material;
    this.id = id; // 可配置元素的id
    this.tagName = tagName; // html标签和react组件标签
    this.type = type; // 元素的所属类型
    this.element = defaultElement.origin;
    this.children = defaultElement.children || null;
    this.childrenIds = enhanceValue.childrenIds || [];
    this.style = { ...defaultElement.style, ...enhanceValue.style };
    this.elementClassName = defaultElement.elementClassName || '';
    this.attribute = defaultElement.attribute || {};
    this.layout = { ...material.layout, ...enhanceValue.layout };
    this.containerClassName = defaultElement.containerClassName || '';
    this.dndType = defaultElement.dndType || 'all'; // 拖拽放置的类型，默认为'all'
    this.extraValue = {}; // 额外的数据
  }

  setChildren(children) {
    this.children = children;
  }

  setStyle(style) {
    this.style = {
      ...this.state,
      ...style,
    };
  }

  setElementClassName(className) {
    this.elementClassName = className;
  }

  setAttribute(attribute) {
    this.attribute = {
      ...this.attribute,
      ...attribute,
    };
  }

  setExtraValue(extraValue) {
    this.extraValue = extraValue;
  }

  setLayout(layout) {
    this.layout = {
      ...this.layout,
      ...layout,
    };
  }

  setChildrenIds(id) {
    this.childrenIds.push(id);
  }

  render() {
    if (this.type === 'antdComp') {
      return this.renderAntdComponent();
    } if (this.type === 'containerComp') {
      return this.renderContainerComponent();
    } if (this.type === 'realContainerComp') {
      return this.renderRealContainerComponent();
    } if (this.type === 'htmlElement') {
      return this.renderHtmlElement();
    }
    return undefined;
  }

  renderAntdComponent() {
    this.element = React.cloneElement(this.element, {
      id: this.id,
      key: this.id,
      style: this.style,
      className: this.elementClassName,
      children: this.children,
      ...this.attribute,
    });
    return this.element;
  }

  renderContainerComponent() {
    this.element = React.cloneElement(this.element, {
      id: this.id,
      key: this.id,
      style: this.style,
      className: this.elementClassName,
      children: this.renderChildren(),
    });
    return this.element;
  }

  renderRealContainerComponent() {
    this.element = React.cloneElement(this.element, {
      id: this.id,
      key: this.id,
      style: this.style,
      className: this.elementClassName,
      children: this.renderChildren(),
      ...this.attribute,
    });
    return this.element;
  }

  // eslint-disable-next-line class-methods-use-this
  renderHtmlElement() {

  }

  renderChildren() {
    if (this.childrenIds.length) {
      return this.childrenIds.map((id) => ConfigurableElement.Elements.find((_) => _.id === id).render());
    }
    return this.children;
  }
}

export default ConfigurableElement;
