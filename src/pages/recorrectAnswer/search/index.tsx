import React, { useEffect, useState } from 'react';
import { CorrectTitle, DescTitle, StyledSearch, Wrap } from './index.style';
import useRequest from '@/hooks/useRequest';
import { questions } from '@/apis';
import useVisible from '@/hooks/useVisible';
import { QuestionType } from '@/apis/questions/schema';
import isNil from 'lodash/isNil';
import { history, useModel } from 'umi';
import { PATH } from '@/config/route';
import dayjs from 'dayjs';

const HomePage: React.FC = () => {
  const { visible, onShow, onHide } = useVisible();
  const [questionId, setQuestionsId] = useState('');
  const { setQuestion } = useModel('useRecorrectAnswer', (model) => ({
    setQuestion: model.setQuestion,
  }));

  /** 根据输入获取题目数据 */
  const { data, isValidating } = useRequest(
    questionId ? questions.getQuestionDetails : null,
    {
      questionId,
    },
    {
      hideNotificationError: true,
    },
  );

  useEffect(() => {
    if (isNil(data)) {
      return;
    }
    const question = data?.data;

    if (isNil(question) || question?.typeId === QuestionType.Answer) {
      onShow();
      return;
    }

    if (
      question && question?.storageTime
        ? dayjs(question?.storageTime).isBefore(dayjs('1971-01-01'))
        : true
    ) {
      onShow();
      return;
    }

    setQuestion(question);
    history.push(PATH.RecorrectAnswerId.replace(':id', question.questionId));
  }, [data, onShow, setQuestion]);

  const onSearch = (value: React.ReactText) => {
    if (isNil(value)) {
      onShow();
      return;
    }
    setQuestionsId(value.toString());
  };
  return (
    <Wrap>
      <CorrectTitle>题目改判</CorrectTitle>
      <DescTitle>单道题目答案集合的结果改判，请谨慎操作！</DescTitle>
      <StyledSearch
        placeholder="请输入题目 ID"
        allowClear
        enterButton="回车搜索题目"
        size="large"
        onSearch={onSearch}
        onChange={onHide}
        showErrorHit={visible}
        loading={isValidating}
      />
    </Wrap>
  );
};

export default React.memo(HomePage);
