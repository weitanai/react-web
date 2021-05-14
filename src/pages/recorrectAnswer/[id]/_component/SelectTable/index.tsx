import React from 'react';
import { IQuestionCount, IsCorrect } from '@/apis/questions/schema';
import { ColumnsType } from 'antd/lib/table';
import { questions } from '@/apis';
import useRequest from '@/hooks/useRequest';
import RecorrectAnswer from '../RecorrectAnswer';
import { useToggle } from 'react-use';
import { StyledTable } from '../../index.style';

const SelectTable: React.FC<StyleTableProps> = ({ questionId }) => {
  const [isLoading, toggleIsLoading] = useToggle(false);
  const { data, isValidating, revalidate } = useRequest(questions.getQuestionAnswerCount, {
    questionId,
  });

  const columns: ColumnsType<IQuestionCount> = [
    {
      title: '答案',
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => <ParseHtml html={`$$ ${text} $$`} />,
    },
    {
      title: '答案数量',
      dataIndex: 'num',
      key: 'num',
      align: 'right',
      width: 90,
    },
    {
      title: '判断结果',
      dataIndex: 'isCorrect',
      key: 'isCorrect',
      align: 'left',
      width: 90,
      render: (isCorrect: IsCorrect, record) => {
        return (
          <RecorrectAnswer
            questionId={questionId}
            isCorrect={isCorrect}
            record={record}
            revalidate={revalidate}
            toggle={toggleIsLoading}
            isFillQuestion={false}
          />
        );
      },
    },
  ];

  return (
    <StyledTable
      loading={isValidating || isLoading}
      dataSource={data?.data || []}
      columns={columns}
      rowKey={(record: IQuestionCount) => `${record.num}${record.value}${record.isCorrect}`}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

interface StyleTableProps {
  questionId: string;
}
export default SelectTable;
