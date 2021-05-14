import getPagination from '@/lib/utils/getPagination';
import React, { useRef, useState } from 'react';
import { FillRadioButton, Operation, StyledRadioWrap, StyledParseHtml } from './index.style';
import { ExclamationCircleFilled, FilterOutlined } from '@ant-design/icons';
import { IQuestionCount, IsCorrect, LATEX_TAG } from '@/apis/questions/schema';
import { Button, Dropdown, Menu, message, Popconfirm, Radio, RadioChangeEvent } from 'antd';
import useRequest from '@/hooks/useRequest';
import { questions } from '@/apis';
import isNil from 'lodash/isNil';
import RecorrectAnswer from '../RecorrectAnswer';
import { useToggle } from 'react-use';
import { ColumnsType } from 'antd/lib/table';
import { StyledTable } from '../../index.style';
import { getEnvPrefix } from '@/lib/utils/getEnvPrefix';
import EllipsisText from './_components/EllipsisText';

const FillTable: React.FC<FillTableProps> = ({ questionId, answerLength = 10 }) => {
  const [answerNo, setAnswerNO] = useState<number>(1);
  const [showType, setShowType] = useState<number>();
  const [isChecked, setIsChecked] = useState<IsCorrect>();
  const [dropVisible, toggleDropVisible] = useToggle(false);

  const [pageParams, setPageParams] = useState({
    pageSize: 10,
    pageIndex: 1,
  });
  const [isLoading, toggleIsLoading] = useToggle(false);

  /** 获取某空答案数量 */
  const { data: fillAnswerList, isValidating, revalidate } = useRequest(
    answerNo ? questions.getFillQuestionAnswerCount : null,
    { questionId, answerNo, showType, ...pageParams },
  );

  /** 获取某空答案集 */
  const { data: answerSet, revalidate: revalidateAnswerSet } = useRequest(
    answerNo ? questions.getFillQuestionAnswerSet : null,
    { questionId, answerNo, ...pageParams },
  );

  /**  点击加入答案集 */
  const addToAnswerSet = async (value: string) => {
    toggleIsLoading(true);
    try {
      await questions.postFillAnswerSet({ questionId, answerNo, value });
    } catch (e) {
      return;
    } finally {
      toggleIsLoading(false);
    }
    revalidate();
    revalidateAnswerSet();
  };

  /**  点击移除答案集 */
  const removeFromAnswerSet = async (value: string, isStandardAnswer: boolean) => {
    toggleIsLoading(true);
    if (isStandardAnswer) {
      window.open(getEnvPrefix(questionId));
      toggleIsLoading(false);
      return;
    }
    try {
      await questions.deleteFillAnswerSet({ questionId, answerNo, value });
    } catch (e) {
      return;
    } finally {
      toggleIsLoading(false);
    }
    revalidate();
    revalidateAnswerSet();
  };

  /** 填空题问题长度 */
  const getRadioButton = (length: number) => {
    const res = [];
    for (let i = 0; i < length; i++) {
      res.push(<FillRadioButton key={i} value={i + 1}>{`第${i + 1}空`}</FillRadioButton>);
    }

    return res;
  };

  const pagination = getPagination({
    pageSize: pageParams.pageSize,
    current: pageParams.pageIndex,
    total: fillAnswerList?.data?.total,
    onShowSizeChange: (page, limit) => {
      setPageParams({ pageIndex: page, pageSize: limit });
    },

    onChange(page) {
      setPageParams((old) => {
        return { ...old, pageIndex: page };
      });
    },
  });

  const onCancel = () => {
    setShowType(undefined);
    setIsChecked(undefined);
    toggleDropVisible(false);
  };

  const onConfirm = () => {
    setShowType(isChecked);
    toggleDropVisible(false);
  };

  const handleMenuClick = ({ key }) => {
    setIsChecked(+key);
  };
  const menu = (
    <Menu multiple={false} onClick={handleMenuClick}>
      <Menu.Item key={IsCorrect.Right}>
        <Radio checked={IsCorrect.Right === isChecked} value={IsCorrect.Right}>
          正确
        </Radio>
      </Menu.Item>
      <Menu.Item key={IsCorrect.Wrong}>
        <Radio checked={IsCorrect.Wrong === isChecked} value={IsCorrect.Wrong}>
          错误
        </Radio>
      </Menu.Item>
      <Menu.Divider />
      <Button size="small" type="text" onClick={onCancel}>
        重置
      </Button>
      <Button style={{ margin: '10px 8px' }} size="small" type="primary" onClick={onConfirm}>
        确定
      </Button>
    </Menu>
  );

  const filter = (
    <Dropdown
      visible={dropVisible}
      overlay={menu}
      trigger={['click']}
      onVisibleChange={toggleDropVisible}
    >
      <FilterOutlined
        style={{ marginLeft: '10px', color: `${isNil(isChecked) ? '' : '#1890ff'}` }}
        onClick={toggleDropVisible}
      />
    </Dropdown>
  );
  const textRef = useRef<HTMLDivElement>(null);
  /** 选择第几空 */
  const changeAnswerNo = (e: RadioChangeEvent) => {
    setPageParams({
      pageSize: 10,
      pageIndex: 1,
    });
    setAnswerNO(e?.target.value);
  };

  const columns: ColumnsType<IQuestionCount> = [
    {
      title: '答案',
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => {
        const isOverflow =
          (document.querySelector('.styled-parse-html> span')?.scrollWidth || 0) > 300;

        return (
          <EllipsisText showTip={isOverflow}>
            {
              <StyledParseHtml
                html={`${LATEX_TAG}${text}${LATEX_TAG}`}
                className={'styled-parse-html'}
              ></StyledParseHtml>
            }
          </EllipsisText>
        );
      },
    },
    {
      title: '答案数量',
      dataIndex: 'num',
      key: 'num',
      align: 'right',
      width: 90,
    },
    {
      title: <>判读结果{filter}</>,
      dataIndex: 'isCorrect',
      key: 'isCorrect',
      align: 'left',
      width: 120,
      render: (isCorrect: IsCorrect, record) => {
        const answerSetHasAnswer = answerSet?.data
          .map((item) => item.value)
          ?.includes(record.value);
        return (
          <RecorrectAnswer
            questionId={questionId}
            isCorrect={isCorrect}
            record={record}
            revalidate={revalidate}
            answerNo={answerNo}
            revalidateAnswerSet={revalidateAnswerSet}
            toggle={toggleIsLoading}
            isFillQuestion={answerSetHasAnswer}
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'left',
      width: 100,
      render: (_, record) => {
        if (isNil(answerSet)) return;
        /** 答案集是否包含这个答案 */
        const answerSetHasAnswer = answerSet?.data
          .map((item) => item.value)
          ?.includes(record.value);

        if (!record.isCorrect && !answerSetHasAnswer) {
          return <Operation>加入答案集</Operation>;
          /** 答案集是否包含这个答案 */
        }
        if (record.isCorrect && answerSetHasAnswer) {
          return <Operation>移出答案集</Operation>;
        }
        if (!record.isCorrect && answerSetHasAnswer) {
          /** 移除的答案是不是标准答案 */
          const isStandardAnswer = answerSet?.data[0]?.value === record.value;

          const handleRemoveFromAnswerSet = () =>
            removeFromAnswerSet(record.value, isStandardAnswer);

          return (
            <Popconfirm
              title={
                isStandardAnswer ? '此为标准答案，确定去原题中移出吗？' : '确定从答案集中移出吗？'
              }
              okType="danger"
              okText={isStandardAnswer ? '去原题中移出' : '移出'}
              icon={<ExclamationCircleFilled style={{ color: '#f85e5e' }} />}
              onConfirm={handleRemoveFromAnswerSet}
            >
              <Operation color={'#F5222D'}>移出答案集</Operation>
            </Popconfirm>
          );
        }
        if (record.isCorrect && !answerSetHasAnswer) {
          const handleAddToAnswerSet = () => {
            if (!record.value) return message.error('无法加入空答案');
            addToAnswerSet(record.value);
          };
          return (
            <Popconfirm
              title="确定加入答案集吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={handleAddToAnswerSet}
            >
              <Operation color={'#1980FF'}>加入答案集</Operation>{' '}
            </Popconfirm>
          );
        }
      },
    },
  ];

  return (
    <>
      <StyledRadioWrap onChange={changeAnswerNo} defaultValue={1}>
        {getRadioButton(answerLength)}
      </StyledRadioWrap>
      <StyledTable
        loading={isValidating || isLoading}
        dataSource={fillAnswerList?.data?.list}
        columns={columns}
        pagination={{ ...pagination, hideOnSinglePage: true }}
        rowKey={(record: IQuestionCount) => `${record.num}${record.value}${record.isCorrect}`}
      />
    </>
  );
};
interface FillTableProps {
  questionId: string;
  answerLength: number;
}
export default FillTable;
