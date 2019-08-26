import styled from 'styled-components';

interface BoxType {
  width?: string;
  padding?: string;
  borderWidth?: string;
  boxShadowTint?: '100' | '200' | '300' | '400' | '500' | '600';
  bgColor?: string;
  borderRadius?: boolean;
  hasHeader?: boolean;
}

export const Box = styled.div<BoxType>`
  min-width: ${p => p.width || '600px'};
  padding: ${p => p.padding || p.theme.spacing[2]};
  box-shadow: 0 0 14px ${p => p.theme.colors.grayscale[p.boxShadowTint || 300]};
  border: ${p => p.borderWidth || 0} solid ${p => p.theme.colors.grayscale[200]};
  background-color: ${p => p.bgColor || p.theme.colors.white};
  border-radius: ${p => p.borderRadius ? '8px' : '0'};
  
  .box__header {
    margin: 0 ${p => `-${p.padding || p.theme.spacing[2]}`} ${p => p.padding || p.theme.spacing[2]};
    padding: 0 ${p => p.padding || p.theme.spacing[2]} ${p => p.padding || p.theme.spacing[2]};
    border-bottom: 1px solid ${p => p.theme.colors.grayscale[200]};
  };

  .box__title {
      margin: 0;
      font-size: ${p => p.theme.fontSizes.xl};
    };

  .box__bottom {
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid ${p => p.theme.colors.grayscale[200]};
    margin: 0 ${p => `-${p.padding || p.theme.spacing[2]}`} 0;
    margin-top: 16px;
  }
`;

Box.defaultProps = {
  className: 'box'
}