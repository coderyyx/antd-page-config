import { Form } from 'antd';
import { parse, stringify } from './transformStyle';

/**
 * @param {Object} fieldsMap {formField: defaultValue}
 * @returns {Object}
 */

export default (fieldsMap = {}) => {
  if (typeof fieldsMap !== 'object' || fieldsMap === null) {
    return {};
  }
  return {
    mapPropsToFields: (props) => {
      const { value = {} } = props;
      const formValus = {};
      // ensure formItem can get Value
      if (value === null || typeof value !== 'object') return {};
      const style = value.style || {};
      const attribute = value.attribute || {};
      Object.keys(fieldsMap).forEach((field) => {
        const defaultValue = fieldsMap[field];
        if (field === 'children') {
          formValus.children = Form.createFormField({ value: value.children || defaultValue });
        } else if (field === 'className') {
          formValus.className = Form.createFormField({ value: value.elementClassName || defaultValue });
        } else if (field === 'style') {
          formValus.style = Form.createFormField({ value: stringify(style) || defaultValue });
        } else if (field === 'options') {
          formValus.options = Form.createFormField({ value: value.options || defaultValue });
        } else if (field === 'layout') {
          formValus.layout = Form.createFormField({ value: value.layout || defaultValue });
        } else {
          formValus[field] = Form.createFormField({ value: attribute[field] || defaultValue });
        }
      });
      return formValus;
    },
    /*
    ######################
      set style has problem
    ######################
    */
    onValuesChange: (props, _, allValue) => {
      // ensure props's value and props's onCollect
      if (typeof props.value === 'object' && props.value !== null && props.value.id && typeof props.onCollect === 'function') {
        const attribute = {};
        Object.keys(allValue).forEach((field) => {
          if (field === 'children') {
            props.onCollect('children', allValue.children);
          } else if (field === 'className') {
            props.onCollect('className', allValue.className);
          } else if (field === 'style') {
            props.onCollect('style', parse(allValue.style));
          } else if (field === 'options') {
            props.onCollect('options', allValue.options);
          } else if (field === 'layout') {
            props.onCollect('layout', allValue.layout);
            props.onCollect('style', {
              width: allValue.layout.w,
              height: allValue.layout.h,
            });
          } else {
            if (field === 'divideGrid') {
              props.onCollect('children', allValue[field].comps);
            }
            attribute[field] = allValue[field];
          }
        });
        props.onCollect('attribute', attribute);
      }
    },
  };
};
