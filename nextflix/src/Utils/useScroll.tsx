import { useEffect, useRef, useCallback } from 'react';

interface UseScrollProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const useScroll = ({ containerRef }: UseScrollProps) => {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const deltaX = touchStartX.current - e.touches[0].clientX;
    touchStartX.current = e.touches[0].clientX;

    if (containerRef.current) {
      containerRef.current.scrollLeft += deltaX;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  const handleWheel = useCallback((e: WheelEvent | React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const container = containerRef.current;
    const cardWidth = 340;

    if (container) {
      if (e.deltaY > 0) {
        container.scrollLeft += cardWidth; // Scroll right
      } else {
        container.scrollLeft -= cardWidth; // Scroll left
      }
    }
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('wheel', handleWheel as EventListener);

      return () => {
        container.removeEventListener('wheel', handleWheel as EventListener);
      };
    }
  }, [containerRef, handleWheel]);

  const handleButtonClick = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    const cardWidth = 340;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    if (container) {
      container.scrollLeft += scrollAmount;
    }
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
    handleButtonClick,
  };
};

export default useScroll;
