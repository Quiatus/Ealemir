
import { useRef, useState, useCallback } from 'react';

export function useTooltipPosition() {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [flipTop, setFlipTop] = useState(false);

  const calculatePosition = useCallback(() => {
    if (tooltipRef.current && wrapperRef.current) {
      const tooltipHeight = tooltipRef.current.getBoundingClientRect().height;
      const wrapperBottom = wrapperRef.current.getBoundingClientRect().bottom;
      const theoreticalBottom = wrapperBottom + tooltipHeight;
      
      setFlipTop(theoreticalBottom > window.innerHeight - 16);
    }
  }, []);

  return { tooltipRef, wrapperRef, flipTop, calculatePosition };
}