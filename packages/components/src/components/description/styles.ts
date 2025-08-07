import { cva } from "class-variance-authority";

// 字体大小变量
export const textSizeVariants = cva('', {
  variants: {
    size: {
      small: 'text-xl',
      medium: 'text-xl',
      large: 'text-2xl',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});