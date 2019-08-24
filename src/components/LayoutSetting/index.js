import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';
import './index.less';

const LayoutSetting = React.forwardRef((props, ref) => {
  const { value = [], onChange } = props;
  const [layout, setLayout] = useState({});
  useEffect(() => {
    setLayout(value);
  }, [value]);

  const changeLayout = (type, val) => {
    const newLayout = {
      ...layout,
      [type]: val,
    };
    setLayout(newLayout);
    if (onChange) {
      onChange(newLayout);
    }
  };

  return (
    <div ref={ref} className='figure'>
      <div className='figure-bounding'>
        <div className='figure-label'>X</div>
        <InputNumber value={layout.x || 0} onChange={changeLayout.bind(this, 'x')} className='figure-size' />
      </div>
      <div className='figure-bounding'>
        <div className='figure-label'>Y</div>
        <InputNumber value={layout.y || 0} onChange={changeLayout.bind(this, 'y')} className='figure-size' />
      </div>
      <div className='figure-bounding'>
        <div className='figure-label'>W</div>
        <InputNumber value={layout.w || 0} onChange={changeLayout.bind(this, 'w')} className='figure-rect' />
      </div>
      <div className='figure-bounding'>
        <div className='figure-label'>H</div>
        <InputNumber value={layout.h || 0} onChange={changeLayout.bind(this, 'h')} className='figure-rect' />
      </div>
    </div>
  );
});


export default LayoutSetting;
