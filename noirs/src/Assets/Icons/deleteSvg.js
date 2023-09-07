import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const DeleteSvg = ({color, size,active}) => {

  const defaultColor =  size ? size : 14


  return (
    <SvgXml
      // width={defaultColor}
      // height={defaultColor}
      xml={`<svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 6.14282H21.5714" stroke="#2D2C42" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.57129 6.14282H18.9999V21.5714C18.9999 22.026 18.8192 22.4621 18.4978 22.7836C18.1763 23.1051 17.7402 23.2857 17.2856 23.2857H5.28557C4.83092 23.2857 4.39488 23.1051 4.07339 22.7836C3.7519 22.4621 3.57129 22.026 3.57129 21.5714V6.14282Z" stroke="#2D2C42" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 6.14286V5.28571C7 4.14907 7.45153 3.05898 8.25526 2.25526C9.05898 1.45153 10.1491 1 11.2857 1C12.4224 1 13.5124 1.45153 14.3162 2.25526C15.1199 3.05898 15.5714 4.14907 15.5714 5.28571V6.14286" stroke="#2D2C42" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.71387 9.57129V18.9999" stroke="#2D2C42" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.8574 9.57129V18.9999" stroke="#2D2C42" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>      
      `}
    />
  );
};

export default DeleteSvg;
