import ConfigurableElement from './ConfigurableElement';
import Components from './Components';
import Containers from './Containers';
import HTMLElements from './HTMLElements';

export default (material, extraValue) => {
  const { type, tagName } = material;
  if (type === 'antdComp') {
    return ConfigurableElement.initialize(material, Components[tagName], extraValue);
  } if (type === 'containerComp') {
    return ConfigurableElement.initialize(material, Containers[tagName], extraValue);
  } if (type === 'htmlElement') {
    return ConfigurableElement.initialize(material, HTMLElements[tagName], extraValue);
  }
  return undefined;
};
