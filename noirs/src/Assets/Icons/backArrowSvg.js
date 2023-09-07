import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const BackArrowSvg = ({color, size,active}) => {

  const defaultColor =  active ? "#FFB800" : "white"


  return (
    <SvgXml
      // width={defaultSize}
      // height={defaultSize}
      xml={`<svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5003 1.16671C10.1948 0.861151 9.80588 0.708374 9.33366 0.708374C8.86144 0.708374 8.47255 0.861151 8.16699 1.16671L0.500325 8.83337C0.333658 9.00004 0.215881 9.1806 0.146992 9.37504C0.0781027 9.56948 0.0431032 9.77782 0.0419921 10C0.0419921 10.2223 0.0836584 10.4378 0.166992 10.6467C0.250325 10.8556 0.361436 11.0289 0.500325 11.1667L8.16699 18.8334C8.47255 19.1389 8.86144 19.2917 9.33366 19.2917C9.80588 19.2917 10.1948 19.1389 10.5003 18.8334C10.8059 18.5278 10.9587 18.1389 10.9587 17.6667C10.9587 17.1945 10.8059 16.8056 10.5003 16.5L4.00033 10L10.5003 3.50004C10.8059 3.19449 10.9587 2.8056 10.9587 2.33337C10.9587 1.86115 10.8059 1.47226 10.5003 1.16671Z" fill="#2D2C42"/>
      </svg>      
      `}
    />
  );
};

export default BackArrowSvg;