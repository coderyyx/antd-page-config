import React from 'react';
import { Select } from 'antd';
import InputAttribute from './components/InputAttribute';
import InputNumberAttribute from './components/InputNumberAttribute';
import SelectAttribute from './components/SelectAttribute';
import DatePickerAttribute from './components/DatePickerAttribute';
import RangePickerAttribute from './components/RangePickerAttribute';
import ButtonAttribute from './components/ButtonAttribute';
import TableAttribute from './components/TableAttribute';
import FormContainerAttribute from './components/FormContainerAttribute';
import GridContainerAttribute from './components/GridContainerAttribute';
import './index.less';

const { Option } = Select;

export default function AttributeSetting(props) {
  const { currentElement = {}, onChange } = props;
  const collectValue = (type, value) => {
    if (type === 'children') {
      currentElement.setChildren(value);
    } else if (type === 'className') {
      currentElement.setElementClassName(value);
    } else if (type === 'style') {
      currentElement.setStyle(value);
    } else if (type === 'attribute') {
      currentElement.setAttribute(value);
    } else if (type === 'layout') {
      currentElement.setLayout(value);
    } else if (type === 'options') {
      currentElement.setOptions(value);
      const options = value.map((n) => (
        <Option key={n.value} value={n.value}>{n.title}</Option>
      ));
      currentElement.setChildren(options);
    }
    onChange(currentElement);
  };

  return (
    <div className='apc-attribute-setting'>
      {
        (() => {
          switch (currentElement.tagName) {
            case 'Input':
              return <InputAttribute onCollect={collectValue} value={currentElement} />;
            case 'InputNumber':
              return <InputNumberAttribute onCollect={collectValue} value={currentElement} />;
            case 'Select':
              return <SelectAttribute onCollect={collectValue} value={currentElement} />;
            case 'DatePicker':
              return <DatePickerAttribute onCollect={collectValue} value={currentElement} />;
            case 'RangePicker':
              return <RangePickerAttribute onCollect={collectValue} value={currentElement} />;
            case 'Button':
              return <ButtonAttribute onCollect={collectValue} value={currentElement} />;
            case 'Table':
              return <TableAttribute onCollect={collectValue} value={currentElement} />;
            case 'Form':
              return <FormContainerAttribute onCollect={collectValue} value={currentElement} />;
            case 'Grid':
              return <GridContainerAttribute onCollect={collectValue} value={currentElement} />;
            default:
              return '请选择';
          }
        })()
      }
    </div>
  );
}
