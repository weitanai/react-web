import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();

  return (
    <Result
      status="404"
      title={'404'}
      subTitle={'没有该页面'}
      extra={
        <Button type="primary" onClick={history.goBack}>
          返回上一页
        </Button>
      }
    />
  );
};
