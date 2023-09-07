import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../../theme';

const WishListSvg = ({color, size,isFocused}) => {

  const defaultColor = isFocused ? "#2D2C42" : "#2D2C42"

  return (
    <SvgXml
      width={size}
      height={size}
      xml={`<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.737 19.6174L11.7356 19.616C9.14149 17.1733 7.06709 15.2147 5.62954 13.3884C4.204 11.5772 3.5 10.0115 3.5 8.3706C3.5 5.67934 5.50635 3.65906 8 3.65906C9.4234 3.65906 10.8171 4.35256 11.7292 5.45612L12.5 6.38876L13.2708 5.45612C14.1829 4.35256 15.5766 3.65906 17 3.65906C19.4936 3.65906 21.5 5.67934 21.5 8.3706C21.5 10.0115 20.796 11.5772 19.3705 13.3884C17.9329 15.2147 15.8585 17.1733 13.2644 19.616L13.263 19.6174L12.5 20.3387L11.737 19.6174Z" stroke="${defaultColor}" stroke-width="2"/>
      </svg>
            
      `}
    />
  );
};

export default WishListSvg;
