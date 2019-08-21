import { rem } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GLOBAL_STYLES = {
  APP_REM_BASELINE: 10,
  APP_TEXT_COLOR: '#322',
  APP_BG_COLOR: '#ffffff',
  APP_PRIMARY_COLOR: '#5e72e4',
  APP_DEFAULT_COLOR: '#172b4d',
  APP_DANGER_COLOR: '#e4012e',
  APP_SUCCESS_COLOR: '#2dce89',
  APP_INFO_COLOR: '#11cdef',
  APP_WHITE_COLOR: '#f4f0f5',
  APP_WARNING_COLOR: '#fb6340',
  APP_SECONDARY_COLOR: '#9256F0',
  APP_GRAY_COLOR: '#d2c9d4',
  APP_LIGHT_GRAY_COLOR: '#f4f0f5',
  CSS_TRANSITION: 'all 150ms ease-in-out',
  APP_ACCENT_COLOR: '#ff858a',
  APP_DARK_GRAY_COLOR: '#928794',
  NUMBER_FONTFAMILY: "'Open Sans', Helvetica, Arial, sans-serif;",
  HIRAGINO_BOLD_FONT: `HiraginoW8, `,
  BOX_SHADOW: '0 1px 2px 0 rgba(82,73,84,0.2)',
  APP_FONT_FAMILY:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
};


export const pxToRem = (px: string | number) => {
  return rem(px, GLOBAL_STYLES.APP_REM_BASELINE);
};


const remBaseCalc = (baseline: number, zoom?: string) => {
  const percent = parseInt(zoom || '100%', 10);
  const result = (percent / 16) * baseline;
  return String(result + '%');
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${remBaseCalc(10)};
    display: flex;
  }
    body {
        background-color: ${props => props.theme.colors.background};
        font-size: ${props => props.theme.fontSizes.md};
        width: 100%;
        min-height: 100vh;
        #root {
          height: 100%;
          display: flex;
        }
        .app {
            color: ${props => props.theme.colors.text};
            min-height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        a, [role="link"] {
            color: ${props => props.theme.colors.primary};
            transition: ${props => props.theme.utils.transition};
            &:hover {
                color: ${props => props.theme.colors.primary};
                text-decoration: underline;
            }
        }
    }
  
    main {
        display: block;
    }
    .route-transition-wrap {
        position: relative;
        width: 100%;
        > div {
            width: 100%;
        }
    };

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 0;
        line-height: 1;
    }
    p {
      margin-top: 0;
    }
`;

export default GlobalStyle;
