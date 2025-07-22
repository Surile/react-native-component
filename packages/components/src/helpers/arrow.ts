type DirectionValue = 'left' | 'up' | 'right' | 'down';

export const getArrowOutline = (x: DirectionValue | undefined) => {
  switch (x) {
    case 'down':
      return 'ChevronDown';

    case 'up':
      return 'ChevronUp';

    case 'left':
      return 'chevron-left';

    default:
      return 'chevron-small-right';
  }
};
