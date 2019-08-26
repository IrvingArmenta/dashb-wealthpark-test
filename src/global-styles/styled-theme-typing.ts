import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: string;
      background: string;
      primary: string;
      secondary: string;
      accent: string;
      black: string;
      white: string;
      grayscale: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
      };
      success: string;
      warning: string;
      danger: string;
      info: string;
    };
    fonts: {
      body: string;
      headings: string;
      serif: string;
      monospace: string;
    };
    /**
     * @remarks
     * fontSizes should be set in rem units , 
     * by default the base is 10px, therefore (1rem = 10px) , (1.4rem = 14px) etc.
     * look at the defaultTheme to see how to set baseline properly.
     */
    fontSizes: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      display: string;
    };
    utils: {
      transition: string;
      boxShadow: string;
    };
    spacing: string[];
  }
}
