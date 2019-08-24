import React from 'react';
import { Button, Input, Select, InputNumber, Table, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default {
  Button: {
    en: 'Button',
    cn: '按钮',
    origin: <Button />,
    children: 'Button',
    originRect: {
      w: 74.98,
      h: 32,
      x: 0,
      y: 0,
    },
    attribute: {
      type: 'primary',
    },
    style: {},
  },
  Input: {
    en: 'Input',
    cn: '输入框',
    origin: <Input />,
    originRect: {
      w: 171,
      h: 32,
      x: 0,
      y: 0,
    },
    attribute: {
      allowClear: false,
    },
  },
  Table: {
    en: 'Table',
    cn: '表格',
    origin: <Table />,
    originRect: {
      w: 182,
      h: 162,
      x: 0,
      y: 0,
    },
    attribute: {
      pagination: false,
      rowKey: 'id',
      columns: [{ dataIndex: 'id', title: '序号' }, { dataIndex: 'name', title: '姓名' }, { dataIndex: 'age', title: '年龄' }],
    },
  },
  Select: {
    en: 'Select',
    cn: '选择器',
    origin: <Select />,
    containerClassName: 'select-dnd',
    originRect: {
      w: 160,
      h: 32,
      x: 0,
      y: 0,
    },
    style: {
      width: '100%',
    },
    attribute: {
      allowClear: false,
    },
  },
  InputNumber: {
    en: 'InputNumber',
    cn: '数字输入框',
    origin: <InputNumber />,
    originRect: {
      w: 88,
      h: 32,
      x: 0,
      y: 0,
    },
  },
  DatePicker: {
    en: 'DatePicker',
    cn: '日期选择框',
    origin: <DatePicker />,
    originRect: {
      w: 171,
      h: 32,
      x: 0,
      y: 0,
    },
    attribute: {
      allowClear: false,
    },
  },
  RangePicker: {
    en: 'RangePicker',
    cn: '范围日期选择框',
    origin: <RangePicker />,
    originRect: {
      w: 306.64,
      h: 32,
      x: 0,
      y: 0,
    },
    attribute: {
      allowClear: false,
    },
  },
};
