import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Colors } from '../../theme';

const PlusSvg = ({ color, size, active }) => {

  const defaultColor = size ? size : 14


  return (
    <SvgXml
      // width={defaultColor}
      // height={defaultColor}
      xml={`<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 9.06899H8.57143V15.4976H6.42857V9.06899H0V6.92613H6.42857V0.497559H8.57143V6.92613H15V9.06899Z" fill="black"/>
      </svg>      
      `}
    />
  );
};

export default PlusSvg;
