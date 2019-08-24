import React, { useState, useEffect } from 'react';
import { Slider, Col, Row } from 'antd';

const colCounts = {
  0: 0,
  1: 2,
  2: 3,
  3: 4,
  4: 6,
  5: 8,
  6: 12,
};

const ColSetting = React.forwardRef((props, ref) => {
  const { value = {}, onChange } = props;
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setNumber(value.number || 0);
  }, [value]);

  const changeSlider = (val) => {
    setNumber(val);
    if (onChange) {
      const colComps = [];
      for (let i = 0; i < colCounts[val]; i += 1) {
        colComps.push(<Col key={i + 1} span={24 / colCounts[val]} />);
      }
      onChange({
        number: val,
        comps: <Row>{colComps}</Row>,
      });
    }
  };

  return (
    <Slider
      ref={ref}
      min={0}
      max={6}
      value={number}
      onChange={changeSlider}
      marks={colCounts}
      step={null}
    />
  );
});

export default ColSetting;
