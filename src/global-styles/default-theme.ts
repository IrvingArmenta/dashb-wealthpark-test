import { DefaultTheme } from 'styled-components';
import { GLOBAL_STYLES, pxToRem } from './GlobalStyle';

export const defaultTheme: DefaultTheme = {
  colors: {
    text: GLOBAL_STYLES.APP_TEXT_COLOR,
    background: GLOBAL_STYLES.APP_BG_COLOR,
    primary: GLOBAL_STYLES.APP_PRIMARY_COLOR,
    secondary: GLOBAL_STYLES.APP_SECONDARY_COLOR,
    accent: GLOBAL_STYLES.APP_ACCENT_COLOR,
    black: '#212529',
    white: '#ffffff',
    grayscale: {
      100: '#f6f9fc',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#8898aa',
    },
    success: GLOBAL_STYLES.APP_SUCCESS_COLOR,
    warning: GLOBAL_STYLES.APP_WARNING_COLOR,
    danger: GLOBAL_STYLES.APP_DANGER_COLOR,
    info: GLOBAL_STYLES.APP_INFO_COLOR,
  },
  fonts: {
    body: GLOBAL_STYLES.APP_FONT_FAMILY,
    headings: GLOBAL_STYLES.APP_FONT_FAMILY,
    serif: GLOBAL_STYLES.APP_FONT_FAMILY,
    monospace: GLOBAL_STYLES.APP_FONT_FAMILY,
  },
  fontSizes: {
    sm: pxToRem('10px'),
    md: pxToRem('14px'),
    lg: pxToRem('18px'),
    xl: pxToRem('24px'),
    display: pxToRem('48px'),
  },
  utils: {
    transition: GLOBAL_STYLES.CSS_TRANSITION,
    boxShadow: GLOBAL_STYLES.BOX_SHADOW,
  },
  spacing: [
    pxToRem(0),
    pxToRem(8),
    pxToRem(16),
    pxToRem(24),
    pxToRem(32),
    pxToRem(40),
    pxToRem(48),
    pxToRem(56),
    pxToRem(64),
  ],
};