import React, { useState, useRef } from 'react';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { TextWrap } from './index.style';

interface EllipsisTextProps {
  placement?: TooltipPlacement;
  showTip?: boolean;
}

const EllipsisText: React.FC<EllipsisTextProps> = ({
  placement = 'topLeft',
  showTip = true,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  console.log(textRef.current);
  const onMouseOver = () => {
    const overflow = Number(textRef.current?.scrollWidth) - Number(textRef.current?.clientWidth);
    if (overflow > 0) {
      setVisible(true);
    }
  };

  const onMouseOut = () => {
    setVisible(false);
  };

  return (
    <Tooltip visible={showTip && visible} placement={placement} title={children}>
      <TextWrap onMouseOver={onMouseOver} onMouseOut={onMouseOut} ref={textRef}>
        {children}
      </TextWrap>
    </Tooltip>
  );
};

export default EllipsisText;
