import { Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;

export const Wrap = styled.div`
  height: calc(100% - 24px);
  width: calc(100% - 24px);
  background-color: #fff;
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CorrectTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: rgba(5, 12, 50, 0.9);
`;

export const DescTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: rgba(5, 12, 50, 0.7);
  margin: 8px 0 32px;
`;

export const StyledSearch = styled(Search)<{ showErrorHit: boolean }>`
  width: 54%;
  max-width: 640px;
  border-radius: 4px;
  .ant-input-affix-wrapper {
    color: rgba(0, 0, 0, 0.45);
  }
  && {
    .ant-input-affix-wrapper:not(:last-child) {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .ant-input-search-button {
      border-radius: 0 4px 4px 0 !important;
    }

    .ant-input-affix-wrapper-focused {
      box-shadow: none;
    }

    .ant-input-clear-icon:active {
      color: rgba(0, 0, 0, 0.45);
    }
  }

  &::after {
    opacity: ${({ showErrorHit }) => (showErrorHit ? 1 : 0)};
    transition: opacity linear 0.2s;
    content: '未搜索到相关题目，请输入正确的题目 ID';
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #f5222d;
    text-align: left !important;
  }
`;
