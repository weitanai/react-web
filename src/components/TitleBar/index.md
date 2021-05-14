# 公共的标题组件

```tsx
import React from 'react';
import TitleBar from '@/components/TitleBar';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  return (
    <TitleBar
      title="一级标题"
      subTitle="二级标题"
      cusRightSide={
        <Button type="primary" icon={<PlusOutlined />}>
          自定义内容
        </Button>
      }
    />
  );
};
```

<API></API>
