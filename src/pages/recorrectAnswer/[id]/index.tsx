import React, { useEffect, useMemo } from 'react';
import {
  QuestionLayout,
  RightSide,
  StyledBreadCrumb,
  Wrap,
  StyleTitleBar,
  QuestionCardWrap,
  ErrorTips,
} from './index.style';
import { useModel, useParams } from 'umi';
import { RightOutlined } from '@ant-design/icons';
import isNil from 'lodash/isNil';
import useRequest from '@/hooks/useRequest';
import { questions } from '@/apis';
import SelectTable from './_component/SelectTable';
import FillTable from './_component/FillTable';
import { Result, Skeleton, Spin } from 'antd';
// import { QuestionType } from '@/apis/questions/schema';
import dayjs from 'dayjs';

const QuestionAnswer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { question, setQuestion } = useModel('useRecorrectAnswer', (model) => ({
    question: model.question,
    setQuestion: model.setQuestion,
  }));

  const { data, isValidating } = useRequest(
    isNil(question) ? questions.getQuestionDetails : null,
    {
      questionId: id,
    },
    { hideNotificationError: true },
  );

  useEffect(() => {
    /** 过滤还没有作答的题目 */
    if (dayjs(data?.data.storageTime).isBefore(dayjs('1971-01-01'))) {
      setQuestion(undefined);
      return;
    }
    if (data) {
      setQuestion(data.data);
    }
  }, [data, setQuestion]);

  const correctContent = useMemo(() => {
    switch (question?.typeId) {
      case QuestionType.Fill: {
        return <FillTable questionId={id} answerLength={question?.answers?.length || 0} />;
      }
      case QuestionType.Select: {
        return <SelectTable questionId={id} />;
      }
      case QuestionType.Answer: {
        return <ErrorTips>暂不支解答题改判</ErrorTips>;
      }
      default: {
        return <Skeleton loading />;
      }
    }
  }, [question, id]);
  if (isNil(question)) {
    return null;
  }

  return (
    <Spin spinning={isValidating}>
      <Wrap>
        <StyledBreadCrumb separator={<RightOutlined />}>
          <StyledBreadCrumb.Item href="/correctweb/recorrectAnswer/search">
            搜索题目
          </StyledBreadCrumb.Item>
          <StyledBreadCrumb.Item href="/correctweb/recorrectAnswer/:id">改判</StyledBreadCrumb.Item>
        </StyledBreadCrumb>

        {!question || (data && !data.data) ? (
          <Result status="404" title="404" subTitle={`${id}不存在或已被删除`} />
        ) : (
          <QuestionLayout>
            <QuestionCardWrap>
              {question ? (
                <QuestionCard
                  question={parseQuestion(question) as IQuestionParse}
                  defaultExtraVisible
                  showExtraBtn={false}
                />
              ) : (
                <Skeleton loading />
              )}
            </QuestionCardWrap>

            <RightSide>
              <StyleTitleBar title="答案" needBorder />
              {correctContent}
            </RightSide>
          </QuestionLayout>
        )}
      </Wrap>
    </Spin>
  );
};

export default QuestionAnswer;
