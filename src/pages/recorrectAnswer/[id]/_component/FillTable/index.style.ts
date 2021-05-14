import { Radio } from 'antd';
import styled, { css } from 'styled-components';

export const FillRadioButton = styled(Radio.Button)`
  && {
    height: 28px;
    line-height: 26px;
    color: rgba(5, 12, 50, 0.7);
    border-color: #dedfe4;

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
      background: #1980ff;
      color: #fefefe;
    }
    &.ant-radio-button-wrapper {
      text-align: center;
      color: rgba(5, 12, 50, 0.7);
    }
  }
`;

const loopRadioRadius = (index: number) => {
  return css`
    ${FillRadioButton} {
      &:nth-child(${index}n + ${index}) {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  `;
};

export const StyledRadioWrap = styled(Radio.Group)`
  margin: 0 16px 16px;
  display: grid;
  grid-template-columns: repeat(8, 12.5%);
  grid-row-gap: 8px;

  @media (min-width: 1531px) {
    ${loopRadioRadius(8)}
  }
  @media (max-width: 1530px) and (min-width: 1391px) {
    grid-template-columns: repeat(7, 14.2%);
    ${loopRadioRadius(7)}
  }
  @media (max-width: 1390px) and (min-width: 1241px) {
    grid-template-columns: repeat(6, 16.6%);
    ${loopRadioRadius(6)}
  }
  @media (max-width: 1240px) and (min-width: 1081px) {
    grid-template-columns: repeat(5, 20%);
    ${loopRadioRadius(5)}
  }
  @media (max-width: 1080px) {
    grid-template-columns: repeat(4, 25%);
    ${loopRadioRadius(4)}
  }
`;

export const Operation = styled.div<{ color?: string }>`
  font-size: 14px;

  ${({ color }) =>
    color
      ? css`
          color: ${color};
        `
      : css`
          color: rgba(5, 12, 50, 0.25);
        `}
`;

export const StyledParseHtml = styled(ParseHtml)<{ className: string }>``;
