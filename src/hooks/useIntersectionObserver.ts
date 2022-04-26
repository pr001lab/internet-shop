import {RefObject, useEffect} from 'react';

function useIntersectionObserver(
  targetRef: RefObject<Element>,
  onIntersectCallback: () => void,
) {
  useEffect(() => {
    if (targetRef.current) {
      const interceptConfig = {
        root: null,
        rootMargin: '0% 0% -3% 0%',
        threshold: 0.9,
      };

      const observer = new IntersectionObserver((entries) => {
        if (entries.every((entry) => entry.isIntersecting)) {
          onIntersectCallback();
        }
      }, interceptConfig);

      observer.observe(targetRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [onIntersectCallback, targetRef]);
}

export default useIntersectionObserver;
