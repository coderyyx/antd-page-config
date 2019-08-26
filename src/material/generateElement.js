import ConfigurableElement from './ConfigurableElement';
import Components from './Components';
import { Containers, RealContainers } from './Containers';
import HTMLElements from './HTMLElements';

export default (material, extraValue) => {
  const { type, tagName } = material;
  let element;
  if (type === 'antdComp') {
    element = ConfigurableElement.initialize(material, Components[tagName], extraValue);
  } if (type === 'containerComp') {
    element = ConfigurableElement.initialize(material, Containers[tagName], extraValue);
  } if (type === 'realContainerComp') {
    element = ConfigurableElement.initialize(material, RealContainers[tagName], extraValue);
  } if (type === 'htmlElement') {
    element = ConfigurableElement.initialize(material, HTMLElements[tagName], extraValue);
  }
  ConfigurableElement.Elements.push(element);
  return element;
};
