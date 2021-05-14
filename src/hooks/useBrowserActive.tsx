import { useState, useEffect, useRef, useCallback } from 'react';
import { isBrowserActive } from '@/lib/utils/is';

/** 判断浏览器是否激活状态 */
const useIsBrowserActive = () => {
  const [isActive, setIsActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  /** 节流，处理来回切换tab的情况 */
  const lazySetActive = useCallback((status) => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIsActive(status);
    }, 500);
  }, []);

  useEffect(() => {
    const func = () => {
      if (isBrowserActive()) {
        lazySetActive(true);
      } else {
        lazySetActive(false);
      }
    };
    const key = isBrowserActive(func) as string;

    return () => {
      document.removeEventListener(key, func);
    };
  }, [lazySetActive]);

  return isActive;
};

export default useIsBrowserActive;
