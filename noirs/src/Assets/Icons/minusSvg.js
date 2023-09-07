import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Colors } from '../../theme';

const MinusSvg = ({ color, size, active }) => {

  const defaultColor = size ? size : 14


  return (
    <SvgXml
      // width={defaultColor}
      // height={defaultColor}
      xml={`<svg width="19" height="4" viewBox="0 0 19 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3.24756H2C1.66848 3.24756 1.35054 3.11586 1.11612 2.88144C0.881696 2.64702 0.75 2.32908 0.75 1.99756C0.75 1.66604 0.881696 1.3481 1.11612 1.11368C1.35054 0.879255 1.66848 0.747559 2 0.747559H17C17.3315 0.747559 17.6495 0.879255 17.8839 1.11368C18.1183 1.3481 18.25 1.66604 18.25 1.99756C18.25 2.32908 18.1183 2.64702 17.8839 2.88144C17.6495 3.11586 17.3315 3.24756 17 3.24756Z" fill="#2D2C42"/>
      </svg>
      
      `}
    />
  );
};

export default MinusSvg;
