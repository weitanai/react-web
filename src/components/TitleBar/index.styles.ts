import styled, { css } from 'styled-components';

export const TitleWrap = styled.div<{ needBorder?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px 12px 1px;
  background: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  ${({ needBorder }) =>
    needBorder
      ? css`
          border-bottom: 1px solid rgba(5, 12, 50, 0.09);
        `
      : ''}
`;

export const VerticalLine = styled.div`
  width: 4px;
  height: 22px;
  background: #1980ff;
  border-radius: 0px 100px 100px 0px;
  margin-right: 11px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: rgba(5, 12, 50, 0.85);
  line-height: 22px;
`;

export const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(5, 12, 50, 0.45);
  margin-left: 10px;
`;

export const CusRightSide = styled.div`
  margin-left: auto;
`;
