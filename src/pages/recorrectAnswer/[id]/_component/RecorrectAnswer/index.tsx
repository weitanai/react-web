import React from 'react';
import { RecorrectAnswerItem, RecorrectAnswerWrap } from './index.style';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { message, Popconfirm } from 'antd';
import { IQuestionCount, IsCorrect } from '@/apis/questions/schema';
import { questions } from '@/apis';
import isNil from 'lodash/isNil';

const RecorrectAnswerList = [
  { value: IsCorrect.Wrong, icon: <CloseOutlined style={{ fontSize: '12px' }} /> },
  { value: IsCorrect.Right, icon: <CheckOutlined style={{ fontSize: '12px' }} /> },
];
const getBgColor = (isCorrect: boolean, correctValue: number) => {
  if (!isCorrect) return '#fefefe';
  if (correctValue === IsCorrect.Right) return ' #52C41A';
  return ' #F5222D';
};

const RecorrectAnswer: React.FC<RecorrectAnswerProps> = ({
  isCorrect,
  record,
  questionId,
  answerNo,
  revalidate,
  revalidateAnswerSet,
  toggle,
  isFillQuestion = true,
}) => {
  const onConfirm = async (isCorrect: number, record: IQuestionCount) => {
    toggle(true);

    try {
      await questions.postChangeQuestionAnswerCount({
        questionId,
        answerNo,
        value: record?.value,
        isCorrect,
      });
    } catch (e) {
      return;
    } finally {
      toggle(false);
    }

    revalidate();
    if (!isNil(revalidateAnswerSet)) {
      revalidateAnswerSet();
    }
  };

  return (
    <RecorrectAnswerWrap>
      {RecorrectAnswerList.map((item) => {
        const handleClick = () => {
          if (record.isCorrect === item.value) {
            const isCorrectText = record.isCorrect ? '正确' : '错误';
            return message.warning(`此答案已判为${isCorrectText}`);
          }
        };
        const handleOnConfirm = () => onConfirm(item.value, record);

        let title;
        if (item.value === 0 && isFillQuestion) {
          title = '此答案属于答案集结果，确定改判为错误吗?';
        } else if (item.value === 0 && !isFillQuestion) {
          title = '确定改判答案为错误吗?';
        } else {
          title = '确定改判答案为正确吗?';
        }

        return (
          <Popconfirm
            title={title}
            okText="确定"
            cancelText="取消"
            onConfirm={handleOnConfirm}
            key={item.value}
            disabled={item.value === record.isCorrect}
          >
            <RecorrectAnswerItem
              isActive={item.value === record.isCorrect}
              bgColor={getBgColor(isCorrect === item.value, isCorrect)}
              color={isCorrect === item.value ? '#FEFEFE' : '#50546F'}
              onClick={handleClick}
            >
              {item.icon}
            </RecorrectAnswerItem>
          </Popconfirm>
        );
      })}
    </RecorrectAnswerWrap>
  );
};

interface RecorrectAnswerProps {
  isCorrect: IsCorrect;
  record: IQuestionCount;
  questionId: string;
  answerNo?: number;
  revalidate: () => Promise<boolean>;
  revalidateAnswerSet?: () => Promise<boolean>;
  toggle: (value: boolean) => void;
  isFillQuestion?: boolean;
}

export default RecorrectAnswer;
