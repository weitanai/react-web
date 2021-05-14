import { PaginationProps } from 'antd/lib/pagination';

interface IGetPaginationProps {
  pageSize: number;
  total?: number;
  current: number;
  onShowSizeChange?: (current: number, size: number) => void;
  onChange?: (page: number, pageSize?: number) => void;
}

const getPagination: (props: IGetPaginationProps) => PaginationProps = ({
  pageSize,
  total,
  current,
  onShowSizeChange,
  onChange,
}) => {
  const pagination: PaginationProps = {
    size: 'default',
    pageSize,
    total,
    current,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '40'],
    showTotal: (total) => `共${total}条`,
    onShowSizeChange,
    onChange,
  };

  return pagination;
};

export default getPagination;
