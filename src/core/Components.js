import React from 'react';
import { Button, Input, Select, InputNumber, Table, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default {
  Button: {
    en: 'Button',
    cn: '按钮',
    origin: <Button />,
    children: 'Button',
    attribute: {
      type: 'primary',
    },
    style: {},
  },
  Input: {
    en: 'Input',
    cn: '输入框',
    origin: <Input />,
    attribute: {
      allowClear: false,
    },
  },
  Table: {
    en: 'Table',
    cn: '表格',
    origin: <Table />,
    containerClassName: 'apc-table-dnd',
    attribute: {
      pagination: false,
      rowKey: 'id',
      columns: [{ dataIndex: 'id', title: 'ID' }, { dataIndex: 'name', title: '姓名' }, { dataIndex: 'age', title: '年龄' }],
    },
  },
  Select: {
    en: 'Select',
    cn: '选择器',
    origin: <Select />,
    containerClassName: 'apc-select-dnd',
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
  },
  DatePicker: {
    en: 'DatePicker',
    cn: '日期选择框',
    origin: <DatePicker />,
    attribute: {
      allowClear: false,
    },
  },
  RangePicker: {
    en: 'RangePicker',
    cn: '范围日期选择框',
    origin: <RangePicker />,
    attribute: {
      allowClear: false,
    },
  },
};
