import { useRef, useState, useEffect } from 'react';

// Hook
function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
      }
      return () => {
        if (node) node.removeEventListener('mouseover', handleMouseOver);
        if (node) node.removeEventListener('mouseout', handleMouseOut);
      };
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, isHovered];
}

export default useHover;
