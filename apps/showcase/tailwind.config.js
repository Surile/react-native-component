const { hairlineWidth } = require('nativewind/theme');
const geistFontPlugin = require('./plugins/geistFontPlugin.js');
const { platformSelect } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@rnr/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          1: '#E8F3FF', // 浅色/白底悬浮
          2: '#BEDAFF', // 文字禁用
          3: '#94BFFF', // 一般禁用
          4: '#6AA1FF', // 特殊场景
          5: '#4080FF', // 门店端
          7: '#0E42D2', // 品牌端
        },
        // 中性色 Neutral Colors
        text: {
          1: '#FFFFFF', // 纯白文字
          2: '#C9CDD4', // 置灰信息
          3: '#86909C', // 次要信息
          4: '#4E5969', // 次强调/正文标题
          5: '#1D2129', // 强调/正文标题
        },
        // 填充色 Fill Colors
        fill: {
          white: '#FFFFFF', // 纯白
          1: '#F7F8FA',
          2: '#F2F3F5', // 浅灰
          3: '#E5E6EB', // 分割线
          4: '#C9CDD4', // 置灰填充
        },
        // 线条色 Line Colors
        line: {
          1: '#F2F3F5',
          2: '#E5E6EB',
          3: '#C9CDD4',
          4: '#86909C',
        },
        // 成功色 Success Colors
        success: {
          1: '#E8FFEA',
          2: '#AFF0B5',
          3: '#7BE188',
          4: '#009A29',
          5: '#23C343',
        },
        // 警告色/提醒色 Warning Colors
        warning: {
          1: '#FFF7E8',
          2: '#FFE4BA',
          3: '#FFCF8B',
          4: '#D25F00',
          5: '#FF9A2E',
        },
        // 错误色 Danger Colors
        danger: {
          1: '#FFECE8',
          2: '#FFECE8',
          3: '#FBACA3',
          4: '#CB2634',
          5: '#F76560',
        },
        primaryNew: {
          1: '#E8F3FF', // 浅色/白底悬浮
          2: '#BEDAFF', // 文字禁用
          3: '#94BFFF', // 一般禁用
          4: '#6AA1FF', // 特殊场景
          5: '#4080FF', // 门店端
          7: '#0E42D2', // 品牌端
          8: '#000000',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      fontSize: {
        xs: ['9px', { lineHeight: '18px' }], // 小标签类文字
        sm: ['10px', { lineHeight: '18px' }], // 辅助信息类补充文字
        tiny: ['11px', { lineHeight: '20px' }], // 用于微标数或补充文字
        base: ['12px', { lineHeight: '20px' }], // 用于多数辅助信息类文字
        md: ['13px', { lineHeight: '22px' }], // 用于多数次级文字
        lg: ['14px', { lineHeight: '22px' }], // 标题、多数正文或者次要文字
        xl: ['15px', { lineHeight: '24px' }], // 标题
        '2xl': ['16px', { lineHeight: '24px' }], // 标题、按钮内文字
        '3xl': ['17px', { lineHeight: '26px' }], // 标题
        '4xl': ['18px', { lineHeight: '26px' }], // 用于评分等重要标题或阅读类文
        '5xl': ['20px', { lineHeight: '28px' }], // 重要标题
        '6xl': ['24px', { lineHeight: '32px' }], // 超大标题
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    platformSelect({ native: geistFontPlugin, default: [] }),
    require('tailwindcss-animate'),
  ],
};
