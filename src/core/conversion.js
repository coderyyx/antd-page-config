export default (elements) => {
  const flatElement = {};
  elements.forEach((element) => {
    flatElement[element.id] = {
      id: element.id,
      tagName: element.tagName,
      type: element.type,
      style: element.style,
      elementClassName: element.elementClassName,
      childrenIds: element.childrenIds,
      layout: element.layout,
      containerClassName: element.containerClassName,
      dndType: element.dndType,
      extraValue: element.extraValue,
    };
    if (typeof element.children === 'string') {
      flatElement[element.id].children = element.children;
    }
  });
  return flatElement;
};
