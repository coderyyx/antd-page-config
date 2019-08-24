export function parse(styleStr) {
  if (styleStr) {
    const style = {};
    const str = styleStr.trim().replace(/\n/g, ',');
    str.split(',').forEach((item) => {
      const hasColon = item.endsWith(':');
      const [label, value] = item.split(':').map((val) => val.trim());
      if (label) {
        if (hasColon) {
          style[`$_$${label}`] = '';
        } else if (value) {
          style[label] = value;
        } else {
          style[`_$_${label}`] = '';
        }
      }
    });
    return style;
  }
  return {};
}

export function stringify(styleObj) {
  let styleStr = '';
  const styleArr = Object.entries(styleObj);
  styleArr.forEach((item, index) => {
    const [label, value] = item;
    if (label.startsWith('$_$')) {
      styleStr += `${label.slice(3, label.length)}:`;
    } else if (label.startsWith('_$_')) {
      styleStr += `${label.slice(3, label.length)}`;
    } else {
      styleStr += `${label}:${value}`;
      if (value) {
        styleStr += styleArr.length - 1 === index ? '' : '\n';
      }
    }
  });
  return styleStr;
}
