import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const SearchSvg = ({color, size,active}) => {

    const defColor = color ? color : "#5C5C5C"
    const defaultSize = size ? size : 17



  return (
    <SvgXml
      // width={defaultSize}
      // height={defaultSize}
      xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 22L20 20M11.5 21C12.7476 21 13.9829 20.7543 15.1355 20.2769C16.2881 19.7994 17.3354 19.0997 18.2175 18.2175C19.0997 17.3354 19.7994 16.2881 20.2769 15.1355C20.7543 13.9829 21 12.7476 21 11.5C21 10.2524 20.7543 9.0171 20.2769 7.86451C19.7994 6.71191 19.0997 5.66464 18.2175 4.78249C17.3354 3.90033 16.2881 3.20056 15.1355 2.72314C13.9829 2.24572 12.7476 2 11.5 2C8.98044 2 6.56408 3.00089 4.78249 4.78249C3.00089 6.56408 2 8.98044 2 11.5C2 14.0196 3.00089 16.4359 4.78249 18.2175C6.56408 19.9991 8.98044 21 11.5 21Z" stroke="${defColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>           
      `}
    />
  );
};

export default SearchSvg;