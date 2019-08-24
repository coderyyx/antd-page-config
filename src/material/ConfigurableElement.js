import React from 'react';

class ConfigurableElement {
  static initialize(material, defaultElement = {}, extraValue = {}) {
    return new ConfigurableElement(material, defaultElement, extraValue);
  }

  constructor(material, defaultElement, extraValue) {
    const { id, type, tagName } = material;
    this.id = id;
    this.type = type;
    this.tagName = tagName;
    this.element = defaultElement.origin;
    this.children = defaultElement.children || null;
    this.attribute = defaultElement.attribute || {};
    this.elementClassName = defaultElement.elementClassName;
    this.style = { ...defaultElement.style, ...extraValue.style };
    this.layout = { ...material.layout, ...extraValue.layout };
    this.originRect = { ...defaultElement.originRect };
    this.containerClassName = defaultElement.containerClassName;
    this.dndType = defaultElement.dndType || '';
    this.options = [];
  }

  setChildren(children) {
    this.children = children;
  }

  setElementClassName(className) {
    this.elementClassName = className;
  }

  setStyle(style) {
    this.style = {
      ...this.state,
      ...style,
    };
  }

  setAttribute(attribute) {
    this.attribute = {
      ...this.attribute,
      ...attribute,
    };
  }

  setOptions(options) {
    this.options = options;
  }

  setLayout(layout) {
    this.layout = {
      ...this.layout,
      ...layout,
    };
  }

  render() {
    if (this.type === 'antdComp') {
      return this.renderAntdComponent();
    } if (this.type === 'containerComp') {
      return this.renderContainerComponent();
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
      children: this.children,
    });
    return this.element;
  }

  // eslint-disable-next-line class-methods-use-this
  renderHtmlElement() {

  }
}

export default ConfigurableElement;
