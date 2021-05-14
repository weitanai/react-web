import styled from 'styled-components';
import { Breadcrumb, Table } from 'antd';
import TitleBar from '@/components/TitleBar';

export const Wrap = styled.div`
  background: #f5f5f7;
  padding: 0 12px 12px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const StyledBreadCrumb = styled(Breadcrumb)`
  && {
    padding: 12px;
    flex-shrink: 0;

    .ant-breadcrumb {
      height: 44px;
      background: #f5f5f7 !important;
    }
  }
`;

export const QuestionLayout = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 1 auto;
  overflow: hidden;
`;

export const RightSide = styled.div`
  width: 50%;
  height: auto;
  background: #ffffff;
  border-radius: 4px;
  overflow-y: auto;
  max-height: 100%;

  .ant-skeleton {
    padding: 12px;
  }
`;

export const StyleTitleBar = styled(TitleBar)`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 2;
  margin-bottom: 16px;
`;

export const QuestionCardWrap = styled.div`
  width: 50%;
  max-height: 100%;
  background: #fff;
  border-radius: 4px;
  margin-right: 12px;
  overflow: hidden auto;

  .ant-skeleton {
    padding: 12px;
  }
`;

export const ErrorTips = styled.div`
  color: #333;
  font-size: 14px;
  text-align: center;
  padding: 20px 12px;
`;

export const StyledTable = styled(Table)`
  padding: 0 16px 16px;
  .ant-table-thead > tr > th {
    font-weight: 400;
    padding: 10px 16px;
    border-bottom: none;
    background-color: #f5f5f7;
    color: rgba(5, 12, 50, 0.45);
    &:first-child {
      padding-left: 10px;
    }
  }

  .ant-table-tbody > tr {
    & > td {
      border-bottom: none;
      color: rgba(5, 12, 50, 0.9);
      font-size: 14px;
      padding: 14px;
    }
    & > td:first-child {
      padding-left: 10px;
    }
    & > td:last-child {
      padding-right: 10px;
    }
    &:nth-child(even) > td {
      background-color: #f5f5f7;
    }
    &:nth-child(odd):hover > td {
      background-color: transparent;
    }
  }
`;
