/**
 * 学习任务
 */
import React, { memo } from 'react';
import { TitleWrap, VerticalLine, Title, SubTitle, CusRightSide } from './index.styles';

export interface ITitleProps {
  className?: string;
  /** 主标题 */
  title: React.ReactText | React.ReactNode;
  /** 二级标题 */
  subTitle?: React.ReactText | React.ReactNode;
  /** 右边区域 */
  cusRightSide?: React.ReactNode;
  /** 是否需要底部border */
  needBorder?: boolean;
}

const TitleBar: React.FC<ITitleProps> = ({
  title,
  subTitle,
  cusRightSide,
  className,
  needBorder = true,
}) => {
  return (
    <TitleWrap className={`title-bar ${className}`} needBorder={needBorder}>
      <VerticalLine />
      <Title>{title}</Title>
      {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
      {cusRightSide ? <CusRightSide>{cusRightSide}</CusRightSide> : null}
    </TitleWrap>
  );
};

export default memo(TitleBar);
