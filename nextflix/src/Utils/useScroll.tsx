import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
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
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener('wheel', handleWheel);

      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [containerRef]);

  const handleButtonClick = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    const cardWidth = 340; // Adjust the card width based on styles
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    if (container) {
      container.scrollLeft += scrollAmount;
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the default behavior

    const container = containerRef.current;
    const cardWidth = 340; // Adjust the card width based on styles

    if (container) {
      if (e.deltaY > 0) {
        container.scrollLeft += cardWidth; // Scroll right
      } else {
        container.scrollLeft -= cardWidth; // Scroll left
      }
    }

    // Stop the propagation of the wheel event to prevent it from affecting parent elements
    // e.stopPropagation();
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
