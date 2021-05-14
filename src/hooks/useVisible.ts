import { useState, useCallback } from 'react';

const useVisible = () => {
  const [visible, setVisible] = useState(false);
  const onShow = useCallback(() => setVisible(true), []);
  const onHide = useCallback(() => setVisible(false), []);
  const onToggle = useCallback(() => setVisible((old) => !old), []);

  return {
    visible,
    setVisible,
    onShow,
    onHide,
    onToggle,
  };
};

export default useVisible;
